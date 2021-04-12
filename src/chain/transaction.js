// Copyright (c) 2016-2021 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('@knuth/bch-native');
const memoize = require('memoizee');
const result = require('../result');
const outputList = require('./outputList');
const inputList = require('./inputList');

// kth_transaction_t kth_chain_transaction_construct(uint32_t version, uint32_t locktime, kth_input_list_t inputs, kth_output_list_t outputs);

class Transaction {
    constructor(version, locktime, inputs, outputs) {
        this.version = version;
        this.locktime = locktime;
        this.inputs = inputs;
        this.outputs = outputs;
    }

    toNative() {
        const native = kth.chain_transaction_construct(
            this.version,
            this.locktime,
            inputList.toNative(this.inputs),
            outputList.toNative(this.outputs)
        );
        return native;
    }

    get hash() {
        const res = memoizedHash(this);
        return res;
    }

    rawData(wire = true) {
        const res = memoizedToData(this, wire);
        return res;
    }
}

const fromNative = (native, destroy = false) => {
    const obj = new Transaction(
        kth.chain_transaction_version(native),
        kth.chain_transaction_locktime(native),
        inputList.fromNative(kth.chain_transaction_inputs(native)),
        outputList.fromNative(kth.chain_transaction_outputs(native))
    );
    if (destroy) {
        destruct(native);
    }
    return obj;
};

const fromData = (version, data) => {
    const native = kth.chain_transaction_factory_from_data(version, data);
    const valid = kth.chain_transaction_is_valid(native);
    if (!valid) {
        destruct(native);
        return new result.Result(undefined, false);
    }
    const obj = fromNative(native);
    destruct(native);
    return new result.Result(obj, true);
};

const toData = (obj, wire = true) => {
    const native = obj.toNative();
    const res = kth.chain_transaction_to_data(native, wire);
    destruct(native);
    return res;
};

const hash = (obj) => {
    const native = obj.toNative();
    const res = kth.chain_transaction_hash(native);
    destruct(native);
    return res;
};

const memoizedToData = memoize(toData);
const memoizedHash = memoize(hash);

const destruct = (native) => {
    kth.chain_transaction_destruct(native);
};

exports.fromNative = fromNative;
exports.fromData = fromData;
exports.destruct = destruct;
exports.hash = hash;
exports.Transaction = Transaction;
