const enc = require('../src/encoding');

test('fromData() and toData()', () => {
    const str1 =
        '000000206f02957eb726a4a50fc471cb15e25099f6af5a976044a5fae905580800000000f1bb8753254766f2ebea2657aa991782fdd2c99a43db0230b51058421373ba9b93a7445fa3c16e1c59c3b224';
    const bytes1 = enc.hexStrToBytes(str1);
    const str2 = enc.bytesToHexStr(bytes1);

    expect(str2).toEqual(str1);
    expect(str2).toBe(str1);
});

test('reverseStr()', () => {
    const str1 =
        '000000206f02957eb726a4a50fc471cb15e25099f6af5a976044a5fae905580800000000f1bb8753254766f2ebea2657aa991782fdd2c99a43db0230b51058421373ba9b93a7445fa3c16e1c59c3b224';
    const reversed = enc.reverseStr(str1);
    const str2 = enc.reverseStr(reversed);

    expect(str1).toEqual(str2);
});

test('Hash encoding', () => {
    const genesisStr = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f';
    const genesisBytes = enc.Hash.strToBytes(genesisStr);
    expect(genesisBytes).toEqual(
        new Uint8Array([
            111,
            226,
            140,
            10,
            182,
            241,
            179,
            114,
            193,
            166,
            162,
            70,
            174,
            99,
            247,
            79,
            147,
            30,
            131,
            101,
            225,
            90,
            8,
            156,
            104,
            214,
            25,
            0,
            0,
            0,
            0,
            0
        ])
    );
    const clone = enc.Hash.bytesToStr(genesisBytes);
    expect(genesisStr).toEqual(clone);
});

test('nullHash encoding', () => {
    expect(enc.Hash.nullHash()).toEqual(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    );
    expect(enc.Hash.bytesToStr(enc.Hash.nullHash())).toEqual(
        '0000000000000000000000000000000000000000000000000000000000000000'
    );
});
