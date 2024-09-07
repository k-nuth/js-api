// Copyright (c) 2016-2024 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const paymentAddress = require('../../src/wallet/paymentAddress');

test('EmptyAddressShouldFail', () => {
    const result = paymentAddress.fromString('');
    expect(result.ok).toBe(false);
});

test('WhitespaceAddressShouldFail', () => {
    const result = paymentAddress.fromString(' ');
    expect(result.ok).toBe(false);
});

test('InvalidAddressShouldFail', () => {
    const result = paymentAddress.fromString('abcd');
    expect(result.ok).toBe(false);
});

test('MainnetCashAddrAddressOK', () => {
    const isVal = paymentAddress.isValid('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(isVal).toBe(true);

    const result = paymentAddress.fromString('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(result.ok).toBe(true);
    const addr = result.obj;
    expect(addr.encoded()).toBe('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(addr.encodedCashAddr()).toBe('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(addr.encodedCashTokens()).toBe('bitcoincash:zrcuqadqrzp2uztjl9wn5sthepkg22majypyxk429j');
    expect(addr.encodedLegacy()).toBe('1P3GQYtcWgZHrrJhUa4ctoQ3QoCU2F65nz');
});

test('MainnetCashAddrNoPrefixAddressOK', () => {
    const isVal = paymentAddress.isValid('qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(isVal).toBe(true);

    const result = paymentAddress.fromString('qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(result.ok).toBe(true);
    const addr = result.obj;
    expect(addr.encoded()).toBe('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(addr.encodedCashAddr()).toBe('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(addr.encodedCashTokens()).toBe('bitcoincash:zrcuqadqrzp2uztjl9wn5sthepkg22majypyxk429j');
    expect(addr.encodedLegacy()).toBe('1P3GQYtcWgZHrrJhUa4ctoQ3QoCU2F65nz');
});

test('MainnetLegacyAddressOK', () => {
    const isVal = paymentAddress.isValid('1P3GQYtcWgZHrrJhUa4ctoQ3QoCU2F65nz');
    expect(isVal).toBe(true);

    const result = paymentAddress.fromString('1P3GQYtcWgZHrrJhUa4ctoQ3QoCU2F65nz');
    expect(result.ok).toBe(true);
    const addr = result.obj;
    expect(addr.encoded()).toBe('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(addr.encodedCashAddr()).toBe('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(addr.encodedCashTokens()).toBe('bitcoincash:zrcuqadqrzp2uztjl9wn5sthepkg22majypyxk429j');
    expect(addr.encodedLegacy()).toBe('1P3GQYtcWgZHrrJhUa4ctoQ3QoCU2F65nz');
});
