const enc = require('../../src/encoding');
const input = require('../../src/chain/input');
const num = require('../../src/numerics');
const output = require('../../src/chain/output');
const outputPoint = require('../../src/chain/outputPoint');
const script = require('../../src/chain/script');
const transaction = require('../../src/chain/transaction');

test('construct using fromData()', () => {
    const genesisStr =
        '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000';
    const genesisBytes = enc.hexStrToBytes(genesisStr);
    const result = transaction.fromData(1, genesisBytes);
    expect(result.ok).toBe(true);

    const tx = result.obj;

    const hashStr = enc.Hash.bytesToStr(tx.hash);
    expect(hashStr).toBe('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b');
    expect(enc.fix(tx.hash)).toEqual(
        enc.Hash.strToBytes('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b')
    );

    expect(tx.version).toBe(1);
    expect(tx.locktime).toBe(0);
    expect(tx.inputs.length).toBe(1);
    expect(tx.outputs.length).toBe(1);

    const inputScriptStr =
        '04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73';
    const inputStr =
        '0000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff';
    const i = tx.inputs[0];
    expect(i.previousOutpoint.index).toBe(0xffffffff);
    expect(enc.Hash.bytesToStr(i.previousOutpoint.hash)).toBe(
        '0000000000000000000000000000000000000000000000000000000000000000'
    );
    expect(enc.bytesToHexStr(i.script.rawData())).toBe(inputScriptStr);
    expect(enc.bytesToHexStr(i.rawData())).toBe(inputStr);
    expect(i.sequence).toBe(0xffffffff);

    const outputScriptStr =
        '4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac';
    const outputStr =
        '00f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac';
    const o = tx.outputs[0];
    expect(o.value).toBe(num.toSatoshis(50));
    expect(enc.bytesToHexStr(o.script.rawData())).toBe(outputScriptStr);
    expect(enc.bytesToHexStr(o.rawData())).toBe(outputStr);

    expect(enc.bytesToHexStr(tx.rawData())).toBe(genesisStr);
});

test('construct using main constructor', () => {
    const inputScriptStr =
        '04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73';
    const inputScriptBytes = enc.hexStrToBytes(inputScriptStr);
    let result = script.fromData(inputScriptBytes, false);
    expect(result.ok).toBe(true);
    const inputScript = result.obj;
    const previousOutpoint = new outputPoint.OutputPoint(enc.Hash.nullHash(), 0xffffffff);
    const inputs = [new input.Input(previousOutpoint, inputScript, 0xffffffff)];

    const outputScriptStr =
        '4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac';
    const outputScriptBytes = enc.hexStrToBytes(outputScriptStr);
    result = script.fromData(outputScriptBytes, false);
    expect(result.ok).toBe(true);
    const outputScript = result.obj;
    const outputs = [new output.Output(num.toSatoshis(50), outputScript)];
    const tx = new transaction.Transaction(1, 0, inputs, outputs);

    const hashStr = enc.Hash.bytesToStr(tx.hash);
    expect(hashStr).toBe('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b');
    expect(enc.fix(tx.hash)).toEqual(
        enc.Hash.strToBytes('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b')
    );

    expect(tx.version).toBe(1);
    expect(tx.locktime).toBe(0);
    expect(tx.inputs.length).toBe(1);
    expect(tx.outputs.length).toBe(1);

    const genesisStr =
        '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000';

    const inputStr =
        '0000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff';
    const i = tx.inputs[0];
    expect(i.previousOutpoint.index).toBe(0xffffffff);
    expect(enc.Hash.bytesToStr(i.previousOutpoint.hash)).toBe(
        '0000000000000000000000000000000000000000000000000000000000000000'
    );
    expect(enc.bytesToHexStr(i.script.rawData())).toBe(inputScriptStr);
    expect(enc.bytesToHexStr(i.rawData())).toBe(inputStr);
    expect(i.sequence).toBe(0xffffffff);

    const outputStr =
        '00f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac';
    const o = tx.outputs[0];
    expect(o.value).toBe(num.toSatoshis(50));
    expect(enc.bytesToHexStr(o.script.rawData())).toBe(outputScriptStr);
    expect(enc.bytesToHexStr(o.rawData())).toBe(outputStr);

    expect(enc.bytesToHexStr(tx.rawData())).toBe(genesisStr);
});
