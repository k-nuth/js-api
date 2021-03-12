// Copyright (c) 2016-2020 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

"use strict";

const kth = require('kth-bch-native')
const memoize = require("memoizee");
const header = require('./header');
const transaction = require('./transaction');
const listCommon = require('./list_common');

class Block {
    constructor(header, transactions) {
        this.header = header;
        this.transactions = transactions;
    }

    toNative() {
        const headerNative = this.header.toNative();
        const txsNative = transaction.list.toNative(this.transactions);
        const native = kth.chain_block_construct(headerNative, txsNative);

        header.destruct(headerNative);
        transaction.list.destruct(txsNative);

        return native;
    }

    get hash() {
        const res = memoizedHash(this)
        return res;
    }

    rawData(wire) {
        const res = memoizedToData(this, wire)
        return res;
    }
}

const fromNative = function(native, destroy = false) {
    const obj = new Block(header.fromNative(kth.chain_block_header(native)),
        transaction.list.fromNative(kth.chain_block_transactions(native)));
    
    if (destroy) {
        destruct(native);    
    }
    return obj;
}

const fromData = function(version, data) {
    const native = kth.chain_block_factory_from_data(version, data)
    const obj = fromNative(native)
    destruct(native);
    return obj;
}

const toData = function(obj, wire) {
    const native = obj.toNative();
    const res = kth.chain_block_to_data(native, wire)
    destruct(native);
    return res;
}

const hash = function(obj) {
    const native = obj.toNative();
    const res = kth.chain_block_hash(native)
    destruct(native);
    return res;
}

const memoizedToData = memoize(toData)
const memoizedHash = memoize(hash)

const destruct = function(native) {
    kth.chain_block_destruct(native);
}

exports.fromNative = fromNative;
exports.fromData = fromData;
exports.destruct = destruct;
exports.Block = Block;
exports.list = listCommon.create(kth, exports, 'chain', 'block')
