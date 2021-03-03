// Copyright (c) 2016-2021 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

function toSatoshisFactor() {
    return 100000000;
}

function toSatoshis(amount) {
    return amount * toSatoshisFactor();
}

function fromSatoshis(satoshis) {
    return satoshis / toSatoshisFactor();
}

exports.toSatoshisFactor = toSatoshisFactor;
exports.toSatoshis = toSatoshis;
exports.fromSatoshis = fromSatoshis;
