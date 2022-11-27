// Copyright (c) 2016-2022 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('@knuth/bch-native');
const memoize = require('memoizee');
const result = require('../result');

class PaymentAddress {
    constructor(addressStr) {
        this.addressStr = addressStr;
    }

    toNative() {
        const native = kth.wallet_payment_address_construct_from_string(this.addressStr);
        return native;
    }

    get hash() {
        const res = memoizedHash(this);
        return res;
    }

    get version() {
        const res = memoizedVersion(this);
        return res;
    }

    encoded() {
        const res = memoizedEncodedCashAddr(this);
        return res;
    }

    encodedCashAddr() {
        const res = memoizedEncodedCashAddr(this);
        return res;
    }

    encodedLegacy() {
        const res = memoizedEncodedLegacy(this);
        return res;
    }
}

const fromNative = (native, destroy = false) => {
    const obj = new PaymentAddress(kth.wallet_payment_address_encoded(native));
    if (destroy) {
        destruct(native);
    }
    return obj;
};

const fromData = (addressStr) => {
    const native = kth.wallet_payment_address_construct_from_string(addressStr);
    const valid = kth.wallet_payment_address_is_valid(native);
    if (!valid) {
        destruct(native);
        return new result.Result(undefined, false);
    }
    const obj = fromNative(native);
    destruct(native);
    return new result.Result(obj, true);
};

const isValid = (addressStr) => {
    const native = kth.wallet_payment_address_construct_from_string(addressStr);
    const valid = kth.wallet_payment_address_is_valid(native);
    destruct(native);
    return valid;
};

const encodedLegacy = (obj) => {
    const native = obj.toNative();
    const res = kth.wallet_payment_address_encoded(native);
    destruct(native);
    return res;
};

const encodedCashAddr = (obj) => {
    const native = obj.toNative();
    const res = kth.wallet_payment_address_encoded_cashaddr(native);
    destruct(native);
    return res;
};

const hash = (obj) => {
    const native = obj.toNative();
    const res = kth.wallet_payment_address_hash(native);
    destruct(native);
    return res;
};

const version = (obj) => {
    const native = obj.toNative();
    const res = kth.wallet_payment_address_version(native);
    destruct(native);
    return res;
};

const memoizedEncodedLegacy = memoize(encodedLegacy);
const memoizedEncodedCashAddr = memoize(encodedCashAddr);
const memoizedHash = memoize(hash);
const memoizedVersion = memoize(version);

const destruct = (native) => {
    kth.wallet_payment_address_destruct(native);
};

exports.fromNative = fromNative;
exports.fromData = fromData;
exports.isValid = isValid;
exports.destruct = destruct;
exports.PaymentAddress = PaymentAddress;
