// Copyright (c) 2016-2024 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('@knuth/bch-native');
const memoize = require('memoizee');
const script = require('./script');
const outputPoint = require('./outputPoint');
const result = require('../result');

class Input {
    constructor(previousOutpoint, script, sequence) {
        this.previousOutpoint = previousOutpoint;
        this.script = script;
        this.sequence = sequence;
    }

    toNative() {
        const native = kth.chain_input_construct(
            this.previousOutpoint.toNative(),
            this.script.toNative(false),
            this.sequence
        );
        return native;
    }

    rawData(wire = true) {
        const res = memoizedToData(this, wire);
        return res;
    }
}

const fromNative = (native, destroy = false) => {
    const obj = new Input(
        outputPoint.fromNative(kth.chain_input_previous_output(native)),
        script.fromNative(kth.chain_input_script(native), false),
        kth.chain_input_sequence(native)
    );
    if (destroy) {
        destruct(native);
    }
    return obj;
};

const fromData = (data) => {
    const native = kth.chain_input_factory_from_data(data);
    const valid = kth.chain_input_is_valid(native);
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
    const res = kth.chain_input_to_data(native, wire);
    destruct(native);
    return res;
};

const memoizedToData = memoize(toData);

const destruct = (native) => {
    kth.chain_input_destruct(native);
};

exports.fromNative = fromNative;
exports.fromData = fromData;
exports.destruct = destruct;
exports.Input = Input;
