/* eslint-disable */

// Copyright (c) 2016-2021 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('kth-bch-native')
const { promisify } = require("util");



// const chain_fetch_last_height = promisify(kth.chain_fetch_last_height);
// const chain_fetch_block_header_by_hash = promisify(kth.chain_fetch_block_header_by_hash);
// const node_init_run_and_wait_for_signal = promisify(kth.node_init_run_and_wait_for_signal);

class Chain {
    constructor(native) {
        this.native = native;
    }
}



const async_node = {
    // start: () => {
    //     console.log('start')
    // },
    // stop: () => {
    //     console.log('stop')
    // },
    init_run_and_wait_for_signal: promisify(kth.node_init_run_and_wait_for_signal)
}

class Node {
    constructor(path, output, error) {
        this.native = kth.node_construct(path, output, error);
    }

    get chain() {
        return this.chain;
    }    
}

constructor.prototype.launch = function() {
    const res = async_node.init_run_and_wait_for_signal(this.native);
    this.chain = new Chain(kth.node_get_chain(this.native));
    return res;
}

// -------------------------------------------------------------

async function wait_until_block(chain, desired_height) {

    var res = await chain.getLastHeight(chain);
    console.log(`getLastHeight is OK, height: ${res.height}`)

    while (res.height < desired_height) {
        var res = await getLastHeight(chain);
        console.log(`getLastHeight is OK, height: ${res.height}`)
        
        if (res.height < desired_height) {
            sleep(1000)
        }
    }
}


async function main() {
    var node = new Node("/home/fernando/testnet4/testnet4.cfg", process.stdout, process.stderr);
    await node.launch();
    // const err2 = await node.launch();
    // console.log(err2);


    setTimeout(function() {
        console.log('program exit...');
        kth.node_signal_stop(node);
        kth.node_destruct(node);
    }, 5000);

}

(async () => {
    try {
        await main();
    } catch (e) {
        console.log(e);
    }
})();
