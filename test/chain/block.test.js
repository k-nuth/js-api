const block = require('../../src/chain/block');
const enc = require('../../src/encoding');
const header = require('../../src/chain/header');
const transaction = require('../../src/chain/transaction');

test('construct using fromData()', () => {
    const genesisStr =
        '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c0101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000';
    const genesisBytes = enc.hexStrToBytes(genesisStr);
    const result = block.fromData(1, genesisBytes);
    expect(result.ok).toBe(true);

    const blk = result.obj;

    const hashStr = enc.Hash.bytesToStr(blk.hash);
    expect(hashStr).toBe('000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f');
    expect(enc.fix(blk.hash)).toEqual(
        enc.Hash.strToBytes('000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f')
    );

    expect(blk.header.version).toBe(1);
    expect(enc.fix(blk.header.previousBlockHash)).toEqual(enc.Hash.nullHash());
    expect(enc.fix(blk.header.merkle)).toEqual(
        enc.Hash.strToBytes('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b')
    );
    expect(blk.header.timestamp).toBe(1231006505);
    expect(blk.header.bits).toBe(0x1d00ffff);
    expect(blk.header.nonce).toBe(2083236893);

    expect(blk.transactions.length).toBe(1);

    const tx = blk.transactions[0];
    expect(tx.version).toBe(1);
    expect(tx.locktime).toBe(0);
    expect(tx.inputs.length).toBe(1);
    expect(tx.outputs.length).toBe(1);
    expect(tx.inputs.length).toBe(1);
    expect(tx.outputs.length).toBe(1);
    expect(enc.Hash.bytesToStr(tx.hash)).toBe('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b');
    const transactionStr =
        '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000';
    expect(enc.bytesToHexStr(tx.rawData())).toBe(transactionStr);

    expect(enc.bytesToHexStr(blk.rawData())).toBe(genesisStr);
});

test('construct using main constructor', () => {
    const headerStr =
        '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c00';
    const headerBytes = enc.hexStrToBytes(headerStr);
    let result = header.fromData(1, headerBytes);
    expect(result.ok).toBe(true);
    const head = result.obj;

    const trasactionStr =
        '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000';
    const trasactionBytes = enc.hexStrToBytes(trasactionStr);
    result = transaction.fromData(1, trasactionBytes);
    expect(result.ok).toBe(true);

    const transactions = [result.obj];

    const blk = new block.Block(head, transactions);

    const hashStr = enc.Hash.bytesToStr(blk.hash);
    expect(hashStr).toBe('000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f');
    expect(enc.fix(blk.hash)).toEqual(
        enc.Hash.strToBytes('000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f')
    );

    expect(blk.header.version).toBe(1);
    expect(enc.fix(blk.header.previousBlockHash)).toEqual(enc.Hash.nullHash());
    expect(enc.fix(blk.header.merkle)).toEqual(
        enc.Hash.strToBytes('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b')
    );
    expect(blk.header.timestamp).toBe(1231006505);
    expect(blk.header.bits).toBe(0x1d00ffff);
    expect(blk.header.nonce).toBe(2083236893);

    expect(blk.transactions.length).toBe(1);

    const tx = blk.transactions[0];
    expect(tx.version).toBe(1);
    expect(tx.locktime).toBe(0);
    expect(tx.inputs.length).toBe(1);
    expect(tx.outputs.length).toBe(1);
    expect(tx.inputs.length).toBe(1);
    expect(tx.outputs.length).toBe(1);
    expect(enc.Hash.bytesToStr(tx.hash)).toBe('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b');
    const transactionStr =
        '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000';
    expect(enc.bytesToHexStr(tx.rawData())).toBe(transactionStr);

    const genesisStr =
        '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c0101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000';
    expect(enc.bytesToHexStr(blk.rawData())).toBe(genesisStr);
});
