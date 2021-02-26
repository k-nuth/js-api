/* eslint-disable */

// Copyright (c) 2016-2020 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('kth-bch-native')

const common = {
    toData: function(obj) {
        const native = obj.toNative();
        return obj;
    }
}
