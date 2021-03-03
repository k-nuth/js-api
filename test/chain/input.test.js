const input = require('../../src/chain/input');
const enc = require('../../src/encoding');
const outputPoint = require('../../src/chain/outputPoint');
const script = require('../../src/chain/script');

test('construct using fromData()', () => {
    // // Input start
    // "0000000000000000000000000000000000000000000000000000000000000000ffffffff"  // 36 (32+4)    Previous Outpoint
    // "4d"                                                                        // 1            Script size 0x4d = 77
    // "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73"
    // "ffffffff"                                                                  // 4            sequence
    // // Input end

    const scriptStr =
        '04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73';

    const inputStr =
        '0000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff';

    const inputBytes = enc.hexStrToBytes(inputStr);
    const result = input.fromData(inputBytes);
    expect(result.ok).toBe(true);
    const i = result.obj;

    expect(i.previousOutpoint.index).toBe(0xffffffff);
    expect(enc.Hash.bytesToStr(i.previousOutpoint.hash)).toBe(
        '0000000000000000000000000000000000000000000000000000000000000000'
    );
    expect(enc.bytesToHexStr(i.script.rawData())).toBe(scriptStr);
    expect(i.sequence).toBe(0xffffffff);
    expect(enc.bytesToHexStr(i.rawData())).toBe(inputStr);
});

test('construct using main constructor', () => {
    const scriptStr =
        '04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73';
    const scriptBytes = enc.hexStrToBytes(scriptStr);
    const result = script.fromData(scriptBytes, false);
    expect(result.ok).toBe(true);
    const s = result.obj;

    const previousOutpoint = new outputPoint.OutputPoint(enc.Hash.nullHash(), 0xffffffff);

    const i = new input.Input(previousOutpoint, s, 0xffffffff);
    expect(i.previousOutpoint.index).toBe(0xffffffff);
    expect(enc.Hash.bytesToStr(i.previousOutpoint.hash)).toBe(
        '0000000000000000000000000000000000000000000000000000000000000000'
    );
    expect(enc.bytesToHexStr(i.script.rawData())).toBe(scriptStr);
    expect(i.sequence).toBe(0xffffffff);
    expect(enc.bytesToHexStr(i.rawData())).toBe(
        '0000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff'
    );
});
