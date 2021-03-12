
// Copyright (c) 2016-2020 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

"use strict";

const kth = require('kth-bch-native')
const memoize = require("memoizee");
const listCommon = require('./list_common');
const script = require('./script');

class Output {
    constructor(value, script) {
        this.value = value;
        this.script = script;
    }

    toNative() {
        const native = kth.chain_output_construct(this.value, this.script);
        return native;
    }

    // get hash() {
    //     const res = memoizedHash(this)
    //     return res;
    // }

    rawData(version) {
        const res = memoizedToData(this, version)
        return res;
    }
}

const fromNative = function(native, destroy = false) {
    const sct = script.fromNative(kth.chain_output_script(native));
    const obj = new Output(kth.chain_output_value(native), sct);
    if (destroy) {
        destruct(native);    
    }
    return obj;
}

const fromData = function(version, data) {
    const native = kth.chain_output_factory_from_data(version, data)
    const obj = fromNative(native)
    destruct(native);
    return obj;
}

const toData = function(obj, version) {
    const native = obj.toNative();
    const res = kth.chain_output_to_data(native, version)
    destruct(native);
    return res;
}

// const hash = function(obj) {
//     const native = obj.toNative();
//     const res = kth.chain_output_hash(native)
//     destruct(native);
//     return res;
// }

const memoizedToData = memoize(toData)
// const memoizedHash = memoize(hash)

const destruct = function(native) {
    kth.chain_output_destruct(native);
}

exports.fromNative = fromNative;
exports.fromData = fromData;
exports.destruct = destruct;
exports.Output = Output;
exports.list = listCommon.create(kth, exports, 'chain', 'output')
