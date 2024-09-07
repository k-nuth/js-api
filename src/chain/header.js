// Copyright (c) 2016-2024 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('@knuth/bch-native');
const memoize = require('memoizee');
const result = require('../result');

class Header {
    constructor(version, previousBlockHash, merkle, timestamp, bits, nonce) {
        this.version = version;
        this.previousBlockHash = previousBlockHash;
        this.merkle = merkle;
        this.timestamp = timestamp;
        this.bits = bits;
        this.nonce = nonce;
    }

    toNative() {
        const native = kth.chain_header_construct(
            this.version,
            this.previousBlockHash,
            this.merkle,
            this.timestamp,
            this.bits,
            this.nonce
        );
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
    const obj = new Header(
        kth.chain_header_version(native),
        kth.chain_header_previous_block_hash(native),
        kth.chain_header_merkle(native),
        kth.chain_header_timestamp(native),
        kth.chain_header_bits(native),
        kth.chain_header_nonce(native)
    );
    if (destroy) {
        destruct(native);
    }
    return obj;
};

const fromData = (version, data) => {
    const native = kth.chain_header_factory_from_data(version, data);
    const valid = kth.chain_header_is_valid(native);
    if (!valid) {
        destruct(native);
        return new result.Result(undefined, false);
    }
    const obj = fromNative(native);
    destruct(native);
    return new result.Result(obj, true);
};

const toData = (obj, version) => {
    const native = obj.toNative();
    const res = kth.chain_header_to_data(native, version);
    destruct(native);
    return res;
};

const hash = (obj) => {
    const native = obj.toNative();
    const res = kth.chain_header_hash(native);
    destruct(native);
    return res;
};

const memoizedToData = memoize(toData);
const memoizedHash = memoize(hash);

const destruct = (native) => {
    kth.chain_header_destruct(native);
};

exports.fromNative = fromNative;
exports.fromData = fromData;
exports.destruct = destruct;
exports.hash = hash;
exports.Header = Header;
