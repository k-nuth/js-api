// Copyright (c) 2016-2024 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const paymentAddress = require('../../src/wallet/paymentAddress');

it('should fail when address is empty', () => {
    const result = paymentAddress.fromString('');
    expect(result.ok).toBe(false);
});

it('should fail when address is whitespace', () => {
    const result = paymentAddress.fromString(' ');
    expect(result.ok).toBe(false);
});

it('should fail when address is invalid', () => {
    const result = paymentAddress.fromString('abcd');
    expect(result.ok).toBe(false);
});

it('should handle mainnet cashaddr address correctly', () => {
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

it('should handle mainnet cashaddr address without prefix correctly', () => {
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

it('should handle mainnet legacy address correctly', () => {
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

it('should handle 32-byte CashAddr correctly for mainnet', () => {
    const isVal = paymentAddress.isValid('bitcoincash:pvstqkm54dtvnpyqxt5m5n7sjsn4enrlxc526xyxlnjkaycdzfeu69reyzmqx');
    expect(isVal).toBe(true);

    const result = paymentAddress.fromString('bitcoincash:pvstqkm54dtvnpyqxt5m5n7sjsn4enrlxc526xyxlnjkaycdzfeu69reyzmqx');
    expect(result.ok).toBe(true);
    const addr = result.obj;
    expect(addr.encodedCashAddr()).toBe('bitcoincash:pvstqkm54dtvnpyqxt5m5n7sjsn4enrlxc526xyxlnjkaycdzfeu69reyzmqx');
    expect(addr.encodedCashTokens()).toBe('bitcoincash:rvstqkm54dtvnpyqxt5m5n7sjsn4enrlxc526xyxlnjkaycdzfeu6hs99m6ed');
    expect(addr.encodedLegacy()).toBe('34frpCV2v6wtzig9xx4Z9XJ6s4jU3zqwR7');// In fact a 32-byte address is not representable in legacy encoding.
});
