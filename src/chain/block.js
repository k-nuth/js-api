// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('@knuth/bch-native');
const memoize = require('memoizee');
const header = require('./header');
const result = require('../result');
const transactionList = require('./transactionList');

class Block {
    constructor(header, transactions) {
        this.header = header;
        this.transactions = transactions;
    }

    toNative() {
        const native = kth.chain_block_construct(this.header.toNative(), transactionList.toNative(this.transactions));
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
    const obj = new Block(
        header.fromNative(kth.chain_block_header(native)),
        transactionList.fromNative(kth.chain_block_transactions(native))
    );
    if (destroy) {
        destruct(native);
    }
    return obj;
};

const fromData = (version, data) => {
    const native = kth.chain_block_factory_from_data(version, data);
    const valid = kth.chain_block_is_valid(native);
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
    const res = kth.chain_block_to_data(native, wire);
    destruct(native);
    return res;
};

const hash = (obj) => {
    const native = obj.toNative();
    const res = kth.chain_block_hash(native);
    destruct(native);
    return res;
};

const memoizedToData = memoize(toData);
const memoizedHash = memoize(hash);

const destruct = (native) => {
    kth.chain_block_destruct(native);
};

exports.fromNative = fromNative;
exports.fromData = fromData;
exports.destruct = destruct;
exports.Block = Block;
