
// Copyright (c) 2016-2020 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

"use strict";

const kth = require('kth-bch-native')
const memoize = require("memoizee");
const listCommon = require('./list_common');
const outputPoint = require('./output_point');
const script = require('./script');

class Input {
    constructor(previousOutput, script, sequence) {
        this.previousOutput = previousOutput;
        this.script = script;
        this.sequence = sequence;
    }

    toNative() {
        const native = kth.chain_input_construct(this.previousOutput, this.script, this.sequence);
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
    const prevOut = outputPoint.fromNative(kth.chain_input_previous_output(native));
    const sct = script.fromNative(kth.chain_input_script(native));
    const obj = new Input(prevOut, sct, kth.chain_input_sequence(native));
    if (destroy) {
        destruct(native);    
    }
    return obj;
}

const fromData = function(version, data) {
    const native = kth.chain_input_factory_from_data(version, data)
    const obj = fromNative(native)
    destruct(native);
    return obj;
}

const toData = function(obj, version) {
    const native = obj.toNative();
    const res = kth.chain_input_to_data(native, version)
    destruct(native);
    return res;
}

// const hash = function(obj) {
//     const native = obj.toNative();
//     const res = kth.chain_input_hash(native)
//     destruct(native);
//     return res;
// }

const memoizedToData = memoize(toData)
// const memoizedHash = memoize(hash)

const destruct = function(native) {
    kth.chain_input_destruct(native);
}

exports.fromNative = fromNative;
exports.fromData = fromData;
exports.destruct = destruct;
exports.Input = Input;
exports.list = listCommon.create(kth, exports, 'chain', 'input')
