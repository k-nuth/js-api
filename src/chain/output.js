// Copyright (c) 2016-2024 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('@knuth/bch-native');
const memoize = require('memoizee');
const script = require('./script');
const result = require('../result');

class Output {
    constructor(value, script) {
        this.value = value;
        this.script = script;
    }

    toNative() {
        const native = kth.chain_output_construct(this.value, this.script.toNative(false));
        return native;
    }

    rawData(wire = true) {
        const res = memoizedToData(this, wire);
        return res;
    }
}

const fromNative = (native, destroy = false) => {
    const obj = new Output(kth.chain_output_value(native), script.fromNative(kth.chain_output_script(native), false));
    if (destroy) {
        destruct(native);
    }
    return obj;
};

const fromData = (data) => {
    const native = kth.chain_output_factory_from_data(data);
    const valid = kth.chain_output_is_valid(native);
    if (!valid) {
        destruct(native);
        return new result.Result(undefined, false);
    }
    const obj = fromNative(native);
    destruct(native);
    return new result.Result(obj, true);
};

const toData = (obj, wire) => {
    const native = obj.toNative();
    const res = kth.chain_output_to_data(native, wire);
    destruct(native);
    return res;
};

const memoizedToData = memoize(toData);

const destruct = (native) => {
    kth.chain_output_destruct(native);
};

exports.fromNative = fromNative;
exports.fromData = fromData;
exports.destruct = destruct;
exports.Output = Output;
