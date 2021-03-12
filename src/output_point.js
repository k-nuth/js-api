
// Copyright (c) 2016-2020 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

"use strict";

const kth = require('kth-bch-native')
const memoize = require("memoizee");

class OutputPoint {
    constructor(hash, index) {
        this.hash = hash;
        this.index = index;
    }

    toNative() {
        const native = kth.chain_output_point_construct(this.hash, this.index);
        return native;
    }

    // get hash() {
    //     const res = memoizedHash(this)
    //     return res;
    // }

    // rawData(version) {
    //     const res = memoizedToData(this, version)
    //     return res;
    // }
}

const fromNative = function(native, destroy = false) {
    const obj = new OutputPoint(
          kth.chain_output_point_get_hash(native)
        , kth.chain_output_point_get_index(native)
    );
    if (destroy) {
        destruct(native);    
    }
    return obj;
}

// const fromData = function(version, data) {
//     const native = kth.chain_output_point_factory_from_data(version, data)
//     const obj = fromNative(native)
//     destruct(native);
//     return obj;
// }

// const toData = function(obj, version) {
//     const native = obj.toNative();
//     const res = kth.chain_output_point_to_data(native, version)
//     destruct(native);
//     return res;
// }

// const hash = function(obj) {
//     const native = obj.toNative();
//     const res = kth.chain_output_point_hash(native)
//     destruct(native);
//     return res;
// }

// const memoizedToData = memoize(toData)
// const memoizedHash = memoize(hash)

const destruct = function(native) {
    kth.chain_output_point_destruct(native);
}

exports.fromNative = fromNative;
// exports.fromData = fromData;
exports.destruct = destruct;
exports.OutputPoint = OutputPoint;

