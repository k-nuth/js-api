const paymentAddress = require('../../src/wallet/paymentAddress');

test('EmptyAddressShouldFail', () => {
    const result = paymentAddress.fromData('');
    expect(result.ok).toBe(false);
});

test('WhitespaceAddressShouldFail', () => {
    const result = paymentAddress.fromData(' ');
    expect(result.ok).toBe(false);
});

test('InvalidAddressShouldFail', () => {
    const result = paymentAddress.fromData('abcd');
    expect(result.ok).toBe(false);
});

test('MainnetCashAddrAddressOK', () => {
    const isVal = paymentAddress.isValid('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(isVal).toBe(true);

    const result = paymentAddress.fromData('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(result.ok).toBe(true);
    const addr = result.obj;
    expect(addr.encoded()).toBe('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    // expect(addr.encodedCashAddr()).toBe('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    // expect(addr.encodedLegacy()).toBe('1P3GQYtcWgZHrrJhUa4ctoQ3QoCU2F65nz');
});

test('MainnetCashAddrNoPrefixAddressOK', () => {
    const isVal = paymentAddress.isValid('qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(isVal).toBe(true);

    const result = paymentAddress.fromData('qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(result.ok).toBe(true);
    const addr = result.obj;
    expect(addr.encoded()).toBe('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(addr.encodedCashAddr()).toBe('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(addr.encodedLegacy()).toBe('1P3GQYtcWgZHrrJhUa4ctoQ3QoCU2F65nz');
});

test('MainnetLegacyAddressOK', () => {
    const isVal = paymentAddress.isValid('1P3GQYtcWgZHrrJhUa4ctoQ3QoCU2F65nz');
    expect(isVal).toBe(true);

    const result = paymentAddress.fromData('1P3GQYtcWgZHrrJhUa4ctoQ3QoCU2F65nz');
    expect(result.ok).toBe(true);
    const addr = result.obj;
    expect(addr.encoded()).toBe('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(addr.encodedCashAddr()).toBe('bitcoincash:qrcuqadqrzp2uztjl9wn5sthepkg22majyxw4gmv6p');
    expect(addr.encodedLegacy()).toBe('1P3GQYtcWgZHrrJhUa4ctoQ3QoCU2F65nz');
});
