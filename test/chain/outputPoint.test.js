const outputPoint = require('../../src/chain/outputPoint');
const enc = require('../../src/encoding');

test('use constructor', () => {
    const op = new outputPoint.OutputPoint(enc.Hash.nullHash(), 0xffffffff);
    expect(op.index).toBe(0xffffffff);
    expect(enc.Hash.bytesToStr(op.hash)).toBe('0000000000000000000000000000000000000000000000000000000000000000');
});
