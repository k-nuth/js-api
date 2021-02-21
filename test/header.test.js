const header = require('../src/header');
const encoding = require('../src/encoding');

test('fromData() and toData()', () => {
    const data = "0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c00";
    const h = header.fromData(1, data);
    const hash = h.hash();
    const hashStr = encoding.Hash.bytesToStr(hash);
    
    expect(hashStr).toBe("000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f");
});