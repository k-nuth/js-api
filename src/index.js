// Copyright (c) 2016-2020 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.


"use strict";

const kth = require('kth-bch-native')
const Promise = require("bluebird");
const header = require('./header');
const block = require('./block');

const async_chain = {
    chain_fetch_last_height: Promise.promisify(kth.chain_fetch_last_height)
  , chain_fetch_block_height: Promise.promisify(kth.chain_fetch_block_height)
  , chain_fetch_block_header_by_height: Promise.promisify(kth.chain_fetch_block_header_by_height, {multiArgs: true})
  , chain_fetch_block_header_by_hash: Promise.promisify(kth.chain_fetch_block_header_by_hash, {multiArgs: true})
  , chain_fetch_block_by_height: Promise.promisify(kth.chain_fetch_block_by_height, {multiArgs: true})
  , chain_fetch_block_by_hash: Promise.promisify(kth.chain_fetch_block_by_hash, {multiArgs: true})
}


class Chain {
    constructor(native) {
        this.native = native;
    }

    getLastHeight() {
        const res = async_chain.chain_fetch_last_height(this.native);
        return res;
    }

    getBlockHeight(hash) {
        const res = async_chain.chain_fetch_block_height(this.native, hash);
        return res;
    }

    async getBlockHeaderByHeight(height) {
        const res = await async_chain.chain_fetch_block_header_by_height(this.native, height);
        return [header.fromNative(res[0]), res[1]];
    }

    async getBlockHeaderByHash(hash) {
        const res = await async_chain.chain_fetch_block_header_by_hash(this.native, hash);
        return [header.fromNative(res[0]), res[1]];
    }

    async getBlockByHeight(height) {
        const res = await async_chain.chain_fetch_block_by_height(this.native, height);
        return [block.fromNative(res[0]), res[1]];
    }

    async getBlockByHash(hash) {
        const res = await async_chain.chain_fetch_block_by_hash(this.native, hash);
        return [block.fromNative(res[0]), res[1]];
    }
}

const async_node = {
    // start: () => {
    //     console.log('start')
    // },
    // stop: () => {
    //     console.log('stop')
    // },
    init_run_and_wait_for_signal: Promise.promisify(kth.node_init_run_and_wait_for_signal)
}

class Node {
    constructor(path, output, error) {
        this.native = kth.node_construct(path, output, error);
    }

    get chain() {
        const res = new Chain(kth.node_get_chain(this.native));
        return res;
    }    
}

constructor.prototype.launch = function() {
    const res = async_node.init_run_and_wait_for_signal(this.native);
    return res;
}

// -------------------------------------------------------------
function hexStringToByte(str) {
    if (!str) {
        return new Uint8Array();
    }

    var a = [];
    for (var i = 0, len = str.length; i < len; i+=2) {
        a.push(parseInt(str.substr(i,2),16));
    }

    return new Uint8Array(a);
}

function reverse(s){
    return s.split("").reverse().join("");
}

function toHash(s) {
    return hexStringToByte(s).reverse();
}

function sleep(sleepDuration) {
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}
// -------------------------------------------------------------


async function wait_until_block(chain, desired_height) {

    var height = await chain.getLastHeight(chain);
    console.log(`getLastHeight is OK, height: ${height}`)

    while (height < desired_height) {
        var height = await getLastHeight(chain);
        console.log(`getLastHeight is OK, height: ${height}`)
        
        if (height < desired_height) {
            sleep(1000)
        }
    }
}

// --------------------------------------------------------------
function byteToHexString(uint8arr) {
    if (!uint8arr) {
        return '';
    }

    var hexStr = '';
    for (var i = 0; i < uint8arr.length; i++) {
        var hex = (uint8arr[i] & 0xff).toString(16);
        hex = (hex.length === 1) ? '0' + hex : hex;
        hexStr += hex;
    }

    return hexStr.toLowerCase();
}

function fromHash(arr) {
    const reversed = [...arr];
    reversed.reverse();
    return byteToHexString(reversed);
    // return byteToHexString(arr.reverse());
}

// --------------------------------------------------------------

function testGetBlockHeaderObject(header) {
    const version = header.version;
    console.log(`testGetBlockHeaderObject, version: ${version}`)

    var previousBlockHash = fromHash(header.previousBlockHash)
    console.log(`testGetBlockHeaderObject, previousBlockHash: ${previousBlockHash}`)

    var merkle = fromHash(header.merkle)
    console.log(`testGetBlockHeaderObject, merkle: ${merkle}`)

    var hash = fromHash(header.hash)
    console.log(`testGetBlockHeaderObject, hash: ${hash}`)

    console.log(`testGetBlockHeaderObject, timestamp: ${header.timestamp}`)

    // var timestamp_date = timestampToDate(header.timestamp)
    // console.log(`testGetBlockHeaderObject, timestamp_date: ${timestamp_date}`)

    console.log(`testGetBlockHeaderObject, bits: ${header.bits}`)
    console.log(`testGetBlockHeaderObject, nonce: ${header.nonce}`)

    console.log(`testGetBlockHeaderObject, rawData 1: ${header.rawData(0)}`)
    console.log(`testGetBlockHeaderObject, rawData 2: ${header.rawData(0)}`)
    console.log(`testGetBlockHeaderObject, rawData 3: ${header.rawData(0)}`)
            
    console.log(`testGetBlockHeaderObject, hash 1: ${fromHash(header.hash)}`)
    console.log(`testGetBlockHeaderObject, hash 2: ${fromHash(header.hash)}`)
    console.log(`testGetBlockHeaderObject, hash 3: ${fromHash(header.hash)}`)


//             kth.chain_header_destruct;
//         } else {
//             console.log(`testGetBlockHeaderObject failed, err: ${err}, height: ${height}`)
//         }
//     });

//     // Testnet4 Genesis block
//     res = await chain_fetch_block_header_by_hash(chain, toHash('000000001dd410c49a788668ce26751718cc797474d3152a5fc073dd44fd9f7b'));
//     console.log(res);

//     res = await chain_fetch_block_header_by_hash(chain, toHash('000000005845885b0f3e66a5a7377c408c7c42bad7528f44862f7b7e741bdb9e'));
//     console.log(res);

//     res = await chain_fetch_block_header_by_hash(chain, hash_arr);
//     console.log(res);





    // const version = header.version;
    // console.log(`testGetBlockHeaderObject, version: ${version}`)

    // var previousBlockHash = fromHash(header.previousBlockHash)
    // console.log(`testGetBlockHeaderObject, previousBlockHash: ${previousBlockHash}`)

    // var merkle = fromHash(header.merkle)
    // console.log(`testGetBlockHeaderObject, merkle: ${merkle}`)

    // var hash = fromHash(header.hash)
    // console.log(`testGetBlockHeaderObject, hash: ${hash}`)

    // console.log(`testGetBlockHeaderObject, timestamp: ${header.timestamp}`)

    // // var timestamp_date = timestampToDate(header.timestamp)
    // // console.log(`testGetBlockHeaderObject, timestamp_date: ${timestamp_date}`)

    // console.log(`testGetBlockHeaderObject, bits: ${header.bits}`)
    // console.log(`testGetBlockHeaderObject, nonce: ${header.nonce}`)

    // console.log(`testGetBlockHeaderObject, rawData 1: ${header.rawData(0)}`)
    // console.log(`testGetBlockHeaderObject, rawData 2: ${header.rawData(0)}`)
    // console.log(`testGetBlockHeaderObject, rawData 3: ${header.rawData(0)}`)
            
    // console.log(`testGetBlockHeaderObject, hash 1: ${fromHash(header.hash)}`)
    // console.log(`testGetBlockHeaderObject, hash 2: ${fromHash(header.hash)}`)
    // console.log(`testGetBlockHeaderObject, hash 3: ${fromHash(header.hash)}`)
}

async function testGetBlockHeaderByHeight(chain) {
    const res = await chain.getBlockHeaderByHeight(2300);
    const headerObj = res[0];
    const height = res[1];

    console.log(`getBlockHeaderByHeight is OK, height: ${height}`);
    testGetBlockHeaderObject(headerObj)

    const data = headerObj.rawData(0);
    console.log(byteToHexString(data));

    const data2 = hexStringToByte('000000206f02957eb726a4a50fc471cb15e25099f6af5a976044a5fae905580800000000f1bb8753254766f2ebea2657aa991782fdd2c99a43db0230b51058421373ba9b93a7445fa3c16e1c59c3b224')
    console.log(byteToHexString(data2));
    const headerObj2 = header.fromData(0, data2);
    testGetBlockHeaderObject(headerObj2)
}

async function testGetBlockHeaderByHash(chain, hash) {

    try {
        const res = await chain.getBlockHeaderByHash(hash);
        const headerObj = res[0];
        const height = res[1];

        console.log(`getBlockHeaderByHash is OK, height: ${height}`);
        testGetBlockHeaderObject(headerObj)
    } catch (e) {
        console.log(e);
    }
}

// --------------------------------------------------------------

function testGetBlockObject(block) {
    var hash = fromHash(block.hash)
    console.log(`testGetBlockObject, hash: ${hash}`)

    testGetBlockHeaderObject(block.header)

    console.log(`testGetBlockObject, rawData 1: ${block.rawData(0)}`)
    console.log(`testGetBlockObject, rawData 2: ${block.rawData(0)}`)
    console.log(`testGetBlockObject, rawData 3: ${block.rawData(0)}`)
            
    console.log(`testGetBlockObject, hash 1: ${fromHash(block.hash)}`)
    console.log(`testGetBlockObject, hash 2: ${fromHash(block.hash)}`)
    console.log(`testGetBlockObject, hash 3: ${fromHash(block.hash)}`)
}

async function testGetBlockByHeight(chain) {
    const res = await chain.getBlockByHeight(2300);
    const blockObj = res[0];
    const height = res[1];

    console.log(`getBlockByHeight is OK, height: ${height}`);
    testGetBlockObject(blockObj)

    const data = blockObj.rawData(0);
    console.log(byteToHexString(data));

    const data2 = hexStringToByte('000000206f02957eb726a4a50fc471cb15e25099f6af5a976044a5fae905580800000000f1bb8753254766f2ebea2657aa991782fdd2c99a43db0230b51058421373ba9b93a7445fa3c16e1c59c3b224')
    console.log(byteToHexString(data2));
    const blockObj2 = block.fromData(0, data2);
    testGetBlockObject(blockObj2)
}


async function main() {
    // var node = new Node("/home/fernando/testnet4/testnet4.cfg", process.stdout, process.stderr);
    var node = new Node("/home/fernando/testnet4/testnet4.cfg", null, null);
    await node.launch();
    // const err2 = await node.launch();
    // console.log(err2);

    // setTimeout(function() {
    //     console.log('program exit...');
    //     kth.node_signal_stop(node);
    //     kth.node_destruct(node);
    // }, 5000);

    const chain = node.chain;
    await wait_until_block(chain, 2300);
    // var hash_arr = toHash('0000000091a5fdf4b5f5fe07ed869bf82049b3d61a403f2771b5cbd1937dad09');
    var hash_arr = toHash('0000000003eeff7f37fb514d485e92f375046d2352ddbc7e636839a65f43880e');
    
    //-----------------------------------
    const height = await chain.getBlockHeight(hash_arr);
    console.log(`getBlockHeightis OK, height: ${height}`);

    //-----------------------------------

    await testGetBlockHeaderByHeight(chain);
    
    
    // Testnet4 Genesis block
    await testGetBlockHeaderByHash(chain, toHash('000000001dd410c49a788668ce26751718cc797474d3152a5fc073dd44fd9f7b'));
    await testGetBlockHeaderByHash(chain, toHash('000000005845885b0f3e66a5a7377c408c7c42bad7528f44862f7b7e741bdb9e'));
    await testGetBlockHeaderByHash(chain, hash_arr);


    await testGetBlockByHeight(chain);



//     //-----------------------------------


//     // kth.chain_fetch_block_by_height(chain, 2300, function (err, block, height) {
//     //     if (err == 0) {
//     //         console.log(`chain_fetch_block_by_height is OK, err:  ${err}, height: ${height}`)
//     //     } else {
//     //         console.log(`chain_fetch_block_by_height failed, err: ${err}, height: ${height}`)
//     //     }
//     // })


//     kth.chain_fetch_block_by_height(chain, 2300, function (err, block, height) {
//         if (err == 0) {
//             console.log(`chain_fetch_block_by_height is OK, err:  ${err}, height: ${height}`)

//             var tx_count = kth.chain_block_transaction_count(block);
//             console.log(`chain_fetch_block_by_height, tx_count: ${tx_count}`)

//             var serialized_size = kth.chain_block_serialized_size(block, 0);
//             console.log(`chain_fetch_block_by_height, serialized_size: ${serialized_size}`)

//             var subsidy = kth.chain_block_subsidy(2300);
//             console.log(`chain_fetch_block_by_height, subsidy: ${subsidy}`)

//             var fees = kth.chain_block_fees(block);
//             console.log(`chain_fetch_block_by_height, fees: ${fees}`)
            
//             var claim = kth.chain_block_claim(block);
//             console.log(`chain_fetch_block_by_height, claim: ${claim}`)
            
            
//             var reward = kth.chain_block_reward(block, 2300);
//             console.log(`chain_fetch_block_by_height, reward: ${reward}`)


//             var merkle_root = fromHash(kth.chain_block_generate_merkle_root(block))
//             console.log(`chain_fetch_block_by_height, merkle_root: ${merkle_root}`)

//             var hash = fromHash(kth.chain_block_hash(block))
//             console.log(`chain_fetch_block_by_height, hash: ${hash}`)

//             var is_valid = kth.chain_block_is_valid(block);
//             console.log(`chain_fetch_block_by_height, is_valid: ${is_valid}`)

//             var tx_nth = kth.chain_block_transaction_nth(block, 0);
//             // console.log(`chain_fetch_block_by_height, tx_nth: ${tx_nth}`)

//             var sigops = kth.chain_block_signature_operations(block);
//             console.log(`chain_fetch_block_by_height, sigops: ${sigops}`)

//             var sigops2 = kth.chain_block_signature_operations_bip16_active(block, true);
//             console.log(`chain_fetch_block_by_height, sigops2: ${sigops2}`)

//             var total_inputs = kth.chain_block_total_inputs(block, true);
//             console.log(`chain_fetch_block_by_height, total_inputs: ${total_inputs}`)

//             var is_extra_coinbase = kth.chain_block_is_extra_coinbase(block);
//             console.log(`chain_fetch_block_by_height, is_extra_coinbase: ${is_extra_coinbase}`)

//             var is_final = kth.chain_block_is_final(block, 2300, 0);
//             console.log(`chain_fetch_block_by_height, is_final: ${is_final}`)

//             var is_distinct_transaction_set = kth.chain_block_is_distinct_transaction_set(block);
//             console.log(`chain_fetch_block_by_height, is_distinct_transaction_set: ${is_distinct_transaction_set}`)

//             var is_valid_coinbase_claim = kth.chain_block_is_valid_coinbase_claim(block, 2300);
//             console.log(`chain_fetch_block_by_height, is_valid_coinbase_claim: ${is_valid_coinbase_claim}`)

//             var is_valid_coinbase_script = kth.chain_block_is_valid_coinbase_script(block, 2300);
//             console.log(`chain_fetch_block_by_height, is_valid_coinbase_script: ${is_valid_coinbase_script}`)

//             var is_internal_double_spend = kth.chain_block_is_internal_double_spend(block);
//             console.log(`chain_fetch_block_by_height, is_internal_double_spend: ${is_internal_double_spend}`)

//             var is_valid_merkle_root = kth.chain_block_is_valid_merkle_root(block);
//             console.log(`chain_fetch_block_by_height, is_valid_merkle_root: ${is_valid_merkle_root}`)
            



//             var header = kth.chain_block_get_header(block);

//             var version = kth._version;
//             console.log(`chain_fetch_block_by_height, version: ${version}`)
            
//             var previous_block_hash = kth._previous_block_hash;
//             // console.log(`chain_fetch_block_by_height, previous_block_hash: ${previous_block_hash}`)
//             var previous_block_hash_str = fromHash(previous_block_hash)
//             console.log(`chain_fetch_block_by_height, previous_block_hash_str: ${previous_block_hash_str}`)
            
//             var merkle = kth._merkle;
//             // console.log(`chain_fetch_block_by_height, merkle: ${merkle}`)
//             var merkle_str = fromHash(merkle)
//             console.log(`chain_fetch_block_by_height, merkle_str: ${merkle_str}`)
            
//             var hash = kth._hash;
//             // console.log(`chain_fetch_block_by_height, hash: ${hash}`)
//             var hash_str = fromHash(hash)
//             console.log(`chain_fetch_block_by_height, hash_str: ${hash_str}`)
            
//             var timestamp = kth._timestamp;
//             console.log(`chain_fetch_block_by_height, timestamp: ${timestamp}`)
            
//             var timestamp_date = timestampToDate(timestamp)
//             console.log(`chain_fetch_block_by_height, timestamp_date: ${timestamp_date}`)
            
            
//             var bits = kth._bits;
//             console.log(`chain_fetch_block_by_height, bits: ${bits}`)
            
//             var nonce = kth._nonce;
//             console.log(`chain_fetch_block_by_height, nonce: ${nonce}`)
            

//         } else {
//             console.log(`chain_fetch_block_by_height failed, err: ${err}, height: ${height}`)
//         }
//     })



//     kth.chain_fetch_block_by_hash(chain, hash_arr, function (err, block, height) {
//         if (err == 0) {
//             console.log(`chain_fetch_block_by_hash is OK, err:  ${err}, height: ${height}`)
//         } else {
//             console.log(`chain_fetch_block_by_hash failed, err: ${err}, height: ${height}`)
//         }
//     })

//     //-----------------------------------


//     kth.chain_fetch_merkle_block_by_height(chain, 2300, function (err, merkle_block, height) {
//         if (err == 0) {
//             console.log(`chain_fetch_merkle_block_by_height is OK, err:  ${err}, height: ${height}`)
//         } else {
//             console.log(`chain_fetch_merkle_block_by_height failed, err: ${err}, height: ${height}`)
//         }
//     })

//     kth.chain_fetch_merkle_block_by_hash(chain, hash_arr, function (err, merkle_block, height) {
//         if (err == 0) {
//             console.log(`chain_fetch_merkle_block_by_hash is OK, err:  ${err}, height: ${height}`)
//         } else {
//             console.log(`chain_fetch_merkle_block_by_hash failed, err: ${err}, height: ${height}`)
//         }
//     })


//     //-----------------------------------
//     // TODO(kth): implement compact blocks.
//     // kth.chain_fetch_compact_block_by_height(chain, 2300, function (err, compact_block, height) {
//     //     if (err == 0) {
//     //         console.log(`chain_fetch_compact_block_by_height is OK, err:  ${err}, height: ${height}`)
//     //     } else {
//     //         console.log(`chain_fetch_compact_block_by_height failed, err: ${err}, height: ${height}`)
//     //     }
//     // })

//     // kth.chain_fetch_compact_block_by_hash(chain, hash_arr, function (err, compact_block, height) {
//     //     if (err == 0) {
//     //         console.log(`chain_fetch_compact_block_by_hash is OK, err:  ${err}, height: ${height}`)
//     //     } else {
//     //         console.log(`chain_fetch_compact_block_by_hash failed, err: ${err}, height: ${height}`)
//     //     }
//     // })

//     //-----------------------------------
//     var tx_hash_arr = toHash('2c8e87226737f9a782e568bf744cf6757cd0f593184df80a61ab0e08c6d86733')

//     // kth.chain_fetch_transaction(chain, tx_hash_arr, false, function (err, tx, index, height) {
//     kth.chain_fetch_transaction(chain, tx_hash_arr, true, function (err, tx, index, height) {
//         if (err == 0) {
//             console.log(`chain_fetch_transaction is OK, err:  ${err}, index: ${index}, height: ${height}`)

            
//             var version = kth.chain_transaction_version(tx)
//             console.log(`chain_fetch_transaction, version: ${version}`)

//             // kth.chain_transaction_set_version(tx)
//             var hash = kth.chain_transaction_hash(tx)
//             console.log(`chain_fetch_transaction, hash: ${hash}`)
            
//             var hash_sighash_type = kth.chain_transaction_hash_sighash_type(tx, 0)
//             console.log(`chain_fetch_transaction, hash_sighash_type: ${hash_sighash_type}`)

//             var locktime = kth.chain_transaction_locktime(tx)
//             console.log(`chain_fetch_transaction, locktime: ${locktime}`)

//             var serialized_size = kth.chain_transaction_serialized_size(tx, true)
//             console.log(`chain_fetch_transaction, serialized_size: ${serialized_size}`)

//             var fees = kth.chain_transaction_fees(tx)
//             console.log(`chain_fetch_transaction, fees: ${fees}`)

//             var signature_operations = kth.chain_transaction_signature_operations(tx)
//             console.log(`chain_fetch_transaction, signature_operations: ${signature_operations}`)

//             var signature_operations_bip16_active = kth.chain_transaction_signature_operations_bip16_active(tx, true)
//             console.log(`chain_fetch_transaction, signature_operations_bip16_active: ${signature_operations_bip16_active}`)

//             var total_input_value = kth.chain_transaction_total_input_value(tx)
//             console.log(`chain_fetch_transaction, total_input_value: ${total_input_value}`)

//             var total_output_value = kth.chain_transaction_total_output_value(tx)
//             console.log(`chain_fetch_transaction, total_output_value: ${total_output_value}`)

//             var is_coinbase = kth.chain_transaction_is_coinbase(tx)
//             console.log(`chain_fetch_transaction, is_coinbase: ${is_coinbase}`)

//             var is_null_non_coinbase = kth.chain_transaction_is_null_non_coinbase(tx)
//             console.log(`chain_fetch_transaction, is_null_non_coinbase: ${is_null_non_coinbase}`)

//             var is_oversized_coinbase = kth.chain_transaction_is_oversized_coinbase(tx)
//             console.log(`chain_fetch_transaction, is_oversized_coinbase: ${is_oversized_coinbase}`)

//             var is_mature = kth.chain_transaction_is_mature(tx, 0)
//             console.log(`chain_fetch_transaction, is_mature: ${is_mature}`)

//             var is_overspent = kth.chain_transaction_is_overspent(tx)
//             console.log(`chain_fetch_transaction, is_overspent: ${is_overspent}`)

//             var is_double_spend = kth.chain_transaction_is_double_spend(tx, true)
//             console.log(`chain_fetch_transaction, is_double_spend: ${is_double_spend}`)

//             var is_missing_previous_outputs = kth.chain_transaction_is_missing_previous_outputs(tx)
//             console.log(`chain_fetch_transaction, is_missing_previous_outputs: ${is_missing_previous_outputs}`)

//             var is_final = kth.chain_transaction_is_final(tx)
//             console.log(`chain_fetch_transaction, is_final: ${is_final}`)

//             var is_locktime_conflict = kth.chain_transaction_is_locktime_conflict(tx)
//             console.log(`chain_fetch_transaction, is_locktime_conflict: ${is_locktime_conflict}`)

//             var outputs = kth.chain_transaction_outputs(tx)
//             // console.log(`chain_fetch_transaction, outputs: ${outputs}`)

//             var inputs = kth.chain_transaction_inputs(tx)
//             // console.log(`chain_fetch_transaction, inputs: ${inputs}`)
            

//             kth.chain_transaction_destruct(tx)
            

//         } else {
//             console.log(`chain_fetch_transaction failed, err: ${err}, index: ${index}, height: ${height}`)
//         }
//     })

//     // kth.chain_fetch_transaction_position(chain, tx_hash_arr, false, function (err, index, height) {
//     kth.chain_fetch_transaction_position(chain, tx_hash_arr, true, function (err, index, height) {
//         if (err == 0) {
//             console.log(`chain_fetch_transaction_position is OK, err:  ${err}, index: ${index}, height: ${height}`)
//         } else {
//             console.log(`chain_fetch_transaction_position failed, err: ${err}, index: ${index}, height: ${height}`)
//         }
//     })
        
//     //-----------------------------------

//     //-----------------------------------


//     console.log('... BEFORE EXIT ...')

//     kth.node_destruct(node)
}

(async () => {
    try {
        await main();
    } catch (e) {
        console.log(e);
    }
})();
