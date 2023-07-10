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

    // console.log(native);

    // const headerNative = kth.chain_block_header(native);
    // console.log(headerNative);
    // const version = kth.chain_header_version(headerNative);
    // console.log(version);
    // // const prevHash = kth.chain_header_previous_block_hash(headerNative);
    // // console.log(prevHash);
    // // const merkle = kth.chain_header_merkle(headerNative);
    // // console.log(merkle);
    // // const timestamp = kth.chain_header_timestamp(headerNative);
    // // console.log(timestamp);
    // // const bits = kth.chain_header_bits(headerNative);
    // // console.log(bits);
    // // const nonce = kth.chain_header_nonce(headerNative);
    // // console.log(nonce);


    // // const h = header.fromNative(kth.chain_block_header(native));
    // // console.log(h);
    // // const txs = transactionList.fromNative(kth.chain_block_transactions(native));
    // // console.log(txs);
    // // const obj = new Block(
    // //     header.fromNative(kth.chain_block_header(native)),
    // //     transactionList.fromNative(kth.chain_block_transactions(native))
    // // );
    // if (destroy) {
    //     destruct(native);
    // }
    // // return obj;
    // return undefined;
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
exports.hash = hash;
exports.Block = Block;
