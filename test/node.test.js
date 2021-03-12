// Copyright (c) 2016-2021 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

/* eslint-disable */

const node = require('../src/node');
const network = require('../src/config/network');
const settings = require('../src/config/settings');
const primitives = require('../src/primitives');

// test('...', () => {
//     const setts = settings.getDefault(network.network.mainnet);

//     let n = new node.Node(setts, true);
//     n.close();
//     // kth.node_init_run_and_wait_for_signal(node, function (err) {
//     //     console.log(err);
//     // });

//     // setTimeout(function() {
//     //     console.log('program exit...');
//     //     kth.node_signal_stop(node);
//     //     kth.node_destruct(node);
//     // }, 15000);
// });


test('...', async () => {
    expect(0).toBe(0);
    const setts = settings.getDefault(network.network.mainnet);
    setts.database.dbMaxSize = 2 * 1024 * 1024;    // 2MiB

    let n = new node.Node(setts, false);
    
    const res = await n.launch(primitives.startModules.justChain);
    expect(res).toBe(0);
    n.close();

    // setTimeout(function() {
    //     n.close();
    // }, 5000);
});

  
// test('...', () => {

    
//     // kth.node_init_run_and_wait_for_signal(node, function (err) {
//     //     console.log(err);
//     // });

//     // setTimeout(function() {
//     //     console.log('program exit...');
//     //     kth.node_signal_stop(node);
//     //     kth.node_destruct(node);
//     // }, 15000);
// });



// test('fromData() and toData()', () => {
//     const str1 =
//         '000000206f02957eb726a4a50fc471cb15e25099f6af5a976044a5fae905580800000000f1bb8753254766f2ebea2657aa991782fdd2c99a43db0230b51058421373ba9b93a7445fa3c16e1c59c3b224';
//     const bytes1 = enc.hexStrToBytes(str1);
//     const str2 = enc.bytesToHexStr(bytes1);

//     expect(str2).toEqual(str1);
//     expect(str2).toBe(str1);
// });
