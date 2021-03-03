// Copyright (c) 2016-2021 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('kth-bch-native');
const input = require('./input');
const genericList = require('./genericList');

const methods = {
    count: (native) => kth.chain_input_list_count(native),
    nth: (native, i) => kth.chain_input_list_nth(native, i),
    fromNative: (elementNative) => input.fromNative(elementNative),
    constructDefault: () => kth.chain_input_list_construct_default(),
    pushBack: (native, elementNative) => kth.chain_input_list_push_back(native, elementNative),
    destruct: (native) => kth.chain_input_list_destruct(native)
};

const instance = genericList.template(methods);
exports.fromNative = (native, destroy = false) => instance.fromNative(native, destroy);
exports.toNative = (arr) => instance.toNative(arr);
exports.destruct = (native) => instance.destruct(native);
