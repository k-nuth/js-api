
// Copyright (c) 2016-2020 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

"use strict";

const kth = require('kth-bch-native')
const memoize = require("memoizee");
const listCommon = require('./list_common');
const input = require('./input');
const output = require('./output');

class Transaction {
    constructor(version, locktime, inputs, outputs) {
        this.version = version;
        this.locktime = locktime;
        this.inputs = inputs;
        this.outputs = outputs;
    }

    toNative() {
        const native = kth.chain_transaction_construct(this.version, this.locktime, this.inputs, this.outputs);
        return native;
    }

    get hash() {
        const res = memoizedHash(this)
        return res;
    }

    rawData(version) {
        const res = memoizedToData(this, version)
        return res;
    }
}

const fromNative = function(native, destroy = false) {
    const inputs = input.list.fromNative(kth.chain_transaction_inputs(native));
    const outputs = output.list.fromNative(kth.chain_transaction_outputs(native));
    const obj = new Transaction(kth.chain_transaction_version(native), kth.chain_transaction_locktime(native), inputs, outputs);
    if (destroy) {
        destruct(native);    
    }
    return obj;
}

const fromData = function(version, data) {
    const native = kth.chain_transaction_factory_from_data(version, data)
    const obj = fromNative(native)
    destruct(native);
    return obj;
}

const toData = function(obj, version) {
    const native = obj.toNative();
    const res = kth.chain_transaction_to_data(native, version)
    destruct(native);
    return res;
}

const hash = function(obj) {
    const native = obj.toNative();
    const res = kth.chain_transaction_hash(native)
    destruct(native);
    return res;
}

const memoizedToData = memoize(toData)
const memoizedHash = memoize(hash)

const destruct = function(native) {
    kth.chain_transaction_destruct(native);
}

exports.fromNative = fromNative;
exports.fromData = fromData;
exports.destruct = destruct;
exports.Transaction = Transaction;
exports.list = listCommon.create(kth, exports, 'chain', 'transaction')
