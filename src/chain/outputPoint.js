// Copyright (c) 2016-2021 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('@knuth/bch-native');

class OutputPoint {
    constructor(hash, index) {
        this.hash = hash;
        this.index = index;
    }

    toNative() {
        const native = kth.chain_output_point_construct_from_hash_index(this.hash, this.index);
        return native;
    }
}

const fromNative = (native, destroy = false) => {
    const obj = new OutputPoint(kth.chain_output_point_get_hash(native), kth.chain_output_point_get_index(native));
    if (destroy) {
        destruct(native);
    }
    return obj;
};

const destruct = (native) => {
    kth.chain_output_point_destruct(native);
};

exports.fromNative = fromNative;
exports.destruct = destruct;
exports.OutputPoint = OutputPoint;
