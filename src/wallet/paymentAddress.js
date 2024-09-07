// Copyright (c) 2016-2024 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('@knuth/bch-native');
const memoize = require('memoizee');
const result = require('../result');

class PaymentAddress {
    constructor(addressStr, tokenAware = false, legacy = false) {
        this.addressStr = addressStr;
        this.tokenAware = tokenAware;
        this.legacy = legacy;
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
        if (this.tokenAware) {
            const res = memoizedEncoded(this, false);
            return res;
        }
        return this.addressStr;
    }

    // This is an alias for encoded()
    encodedCashAddr() {
        const res = memoizedEncoded(this, false);
        return res;
    }

    encodedCashTokens() {
        const res = memoizedEncoded(this, true);
        return res;
    }

    encodedLegacy() {
        const res = memoizedEncodedLegacy(this);
        return res;
    }
}

const fromNative = (native, destroy = false) => {
    const obj = new PaymentAddress(kth.wallet_payment_address_encoded_cashaddr(native, false), false, false);
    if (destroy) {
        destruct(native);
    }
    return obj;
};

const fromNativeCashTokens = (native, destroy = false) => {
    const obj = new PaymentAddress(kth.wallet_payment_address_encoded_cashaddr(native, true), true, false);
    if (destroy) {
        destruct(native);
    }
    return obj;
};

const fromNativeLegacy = (native, destroy = false) => {
    const obj = new PaymentAddress(kth.wallet_payment_address_encoded_legacy(native), false, true);
    if (destroy) {
        destruct(native);
    }
    return obj;
};

const fromString = (addressStr) => {
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

const fromStringCashTokens = (addressStr) => {
    const native = kth.wallet_payment_address_construct_from_string(addressStr);
    const valid = kth.wallet_payment_address_is_valid(native);
    if (!valid) {
        destruct(native);
        return new result.Result(undefined, false);
    }
    const obj = fromNativeCashTokens(native);
    destruct(native);
    return new result.Result(obj, true);
};

const fromStringLegacy = (addressStr) => {
    const native = kth.wallet_payment_address_construct_from_string(addressStr);
    const valid = kth.wallet_payment_address_is_valid(native);
    if (!valid) {
        destruct(native);
        return new result.Result(undefined, false);
    }
    const obj = fromNativeLegacy(native);
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
    const res = kth.wallet_payment_address_encoded_legacy(native);
    destruct(native);
    return res;
};

const encoded = (obj, tokenAware) => {
    const native = obj.toNative();
    const res = kth.wallet_payment_address_encoded_cashaddr(native, tokenAware);
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

const memoizedEncoded = memoize(encoded);
const memoizedEncodedLegacy = memoize(encodedLegacy);
const memoizedHash = memoize(hash);
const memoizedVersion = memoize(version);

const destruct = (native) => {
    kth.wallet_payment_address_destruct(native);
};

exports.fromNative = fromNative;
exports.fromNativeCashTokens = fromNativeCashTokens;
exports.fromNativeLegacy = fromNativeLegacy;

exports.fromString = fromString;
exports.fromStringCashTokens = fromStringCashTokens;
exports.fromStringLegacy = fromStringLegacy;

exports.isValid = isValid;
exports.destruct = destruct;
exports.PaymentAddress = PaymentAddress;
