// Copyright (c) 2016-2020 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('kth-bch-native');
const memoize = require('memoizee');

class Block {
    constructor(header, transactions) {
        this.header = header;
        this.transactions = transactions;
    }

    toNative() {
        const native = kth.chain_block_construct(this.header, this.transactions);
        return native;
    }

    get hash() {
        const res = memoizedHash(this);
        return res;
    }

    rawData(version) {
        const res = memoizedToData(this, version);
        return res;
    }
}

const fromNative = (native, destroy = false) => {
    const obj = new Block(
        kth.chain_block_header(native),
        kth.chain_block_transactions(native),
    );
    if (destroy) {
        destruct(native);
    }
    return obj;
};

const fromData = (version, data) => {
    const native = kth.chain_block_factory_from_data(version, data);
    const obj = fromNative(native);
    destruct(native);
    return obj;
};

const toData = (obj, version) => {
    const native = obj.toNative();
    const res = kth.chain_block_to_data(native, version);
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
