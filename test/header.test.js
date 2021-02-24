const header = require('../src/header');
const enc = require('../src/encoding');

test('construct using fromData()', () => {
  const genesisStr = '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c00';
  const genesisBytes = enc.hexStrToBytes(genesisStr);
  const h = header.fromData(1, genesisBytes);
  const hashStr = enc.Hash.bytesToStr(h.hash);
  expect(hashStr).toBe('000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f');
  expect(enc.fix(h.hash)).toEqual(enc.Hash.strToBytes('000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'));
  expect(h.version).toBe(1);
  expect(enc.fix(h.previousBlockHash)).toEqual(enc.Hash.strToBytes('0000000000000000000000000000000000000000000000000000000000000000'));
  expect(enc.fix(h.merkle)).toEqual(enc.Hash.strToBytes('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b'));
  expect(h.timestamp).toBe(1231006505);
  expect(h.bits).toBe(0x1d00ffff);
  expect(h.nonce).toBe(2083236893);
  expect(enc.bytesToHexStr(h.rawData(1))).toBe(genesisStr);
});

test('construct using main constructor', () => {
  const previousBlockHash = enc.Hash.strToBytes('0000000000000000000000000000000000000000000000000000000000000000');
  const merkle = enc.Hash.strToBytes('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b');
  const h = new header.Header(1, previousBlockHash, merkle, 1231006505, 0x1d00ffff, 2083236893);

  expect(enc.Hash.bytesToStr(h.hash)).toBe('000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f');
  expect(enc.Hash.bytesToStr(h.hash)).toEqual('000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f');
  expect(h.version).toBe(1);
  expect(enc.Hash.bytesToStr(h.previousBlockHash)).toEqual('0000000000000000000000000000000000000000000000000000000000000000');
  expect(enc.Hash.bytesToStr(h.merkle)).toEqual('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b');
  expect(h.timestamp).toBe(1231006505);
  expect(h.bits).toBe(0x1d00ffff);
  expect(h.nonce).toBe(2083236893);
  expect(enc.bytesToHexStr(h.rawData(1))).toBe('0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c00');
});
