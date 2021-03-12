// Copyright (c) 2016-2021 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('kth-bch-native');
const memoize = require('memoizee');
const result = require('../result');

class Script {
    constructor(encoded) {
        this.encoded = encoded;
    }

    toNative(prefix) {
        const native = kth.chain_script_construct(this.encoded, prefix);
        return native;
    }

    rawData() {
        const res = memoizedToData(this);
        return res;
    }
}

const fromNative = (native, prefix, destroy = false) => {
    const obj = new Script(kth.chain_script_to_data(native, prefix));
    if (destroy) {
        destruct(native);
    }
    return obj;
};

const fromData = (encoded, prefix) => {
    const native = kth.chain_script_construct(encoded, prefix);
    const valid = kth.chain_script_is_valid(native);
    if (!valid) {
        destruct(native);
        return new result.Result(undefined, false);
    }
    const obj = fromNative(native, prefix);
    destruct(native);
    return new result.Result(obj, true);
};

const toData = (obj) => {
    const res = obj.encoded;
    return res;
};

const memoizedToData = memoize(toData);

const destruct = (native) => {
    kth.chain_script_destruct(native);
};

exports.fromNative = fromNative;
exports.fromData = fromData;
exports.destruct = destruct;
exports.Script = Script;
