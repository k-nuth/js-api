const output = require('../../src/chain/output');
const enc = require('../../src/encoding');
const num = require('../../src/numerics');
const script = require('../../src/chain/script');

test('construct using fromData()', () => {
    // // Output end
    // "00f2052a01000000"                                                          // 8            Amount
    // "43"                                                                        // 1            Script size 0x43 = 67
    // "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac"
    // // Output end

    const scriptStr =
        '4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac';

    const outputStr =
        '00f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac';

    const outputBytes = enc.hexStrToBytes(outputStr);
    const result = output.fromData(outputBytes);
    expect(result.ok).toBe(true);
    const o = result.obj;

    expect(o.value).toBe(num.toSatoshis(50));
    expect(enc.bytesToHexStr(o.script.rawData())).toBe(scriptStr);
    expect(enc.bytesToHexStr(o.rawData())).toBe(outputStr);
});

test('construct using main constructor', () => {
    const scriptStr =
        '4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac';
    const scriptBytes = enc.hexStrToBytes(scriptStr);
    const result = script.fromData(scriptBytes, false);
    expect(result.ok).toBe(true);
    const s = result.obj;

    const o = new output.Output(num.toSatoshis(50), s);
    expect(o.value).toBe(num.toSatoshis(50));
    expect(enc.bytesToHexStr(o.script.rawData())).toBe(scriptStr);
    expect(enc.bytesToHexStr(o.rawData())).toBe(
        '00f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac'
    );
});
