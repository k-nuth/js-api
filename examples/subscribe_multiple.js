// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

/* eslint-disable */

// const kth = require("@knuth/bch")
const kth = require('../src/kth');

let running_ = false;

let max   = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23];
let count = [0, 0, 0, 0, 0,  0,  0,  0,  0,  0];

const onBlockArrivedGenerator = (n) => {
    return (e, height, incomingBlocks, outgoingBlocks) => {
        // console.log(`onBlockArrivedGenerator ${n}: `, e, height);
        console.log(`onBlockArrivedGenerator - `, n, e, height);

        if (e !== kth.errors.success) {
            console.log(`Error: ${e}`);
            return false;
        }

        if ( ! running_) {
            return false;
        }

        if (incomingBlocks.length > 0) {
            console.log("new tip height: ", height + incomingBlocks.length);
        }

        if (n >= max.length) {
            console.log("n >= max.length");
            return false;
        }

        count[n] += 1;
        if (count[n] >= max[n]) {
            console.log("count[n] >= max[n]");
            return false;
        }

        return true;
    }
}

const onTransactionArrivedGenerator = (n) => {
    return (e, tx) => {
        console.log(`onTransactionArrivedGenerator - `, n, e, tx);

        if (e !== kth.errors.success) {
            console.log(`Error: ${e}`);
            return false;
        }

        if ( ! running_) {
            return false;
        }

        if (tx !== null) {
            console.log("Transaction received: ", tx);
        }

        if (n >= max.length) {
            console.log("n >= max.length");
            return false;
        }

        count[n] += 1;
        if (count[n] >= max[n]) {
            console.log("count[n] >= max[n]");
            return false;
        }

        return true;
    }
}

async function main() {
    process.on('SIGINT', shutdown);
    const config = kth.settings.getDefault(kth.network.chipnet);
    const node = new kth.node.Node(config, false);
    await node.launch(kth.startModules.all);
    console.log("Knuth node has been launched.");
    running_ = true;

    node.chain.subscribeBlockchain(onBlockArrivedGenerator(0));
    node.chain.subscribeBlockchain(onBlockArrivedGenerator(1));
    node.chain.subscribeBlockchain(onBlockArrivedGenerator(2));
    node.chain.subscribeBlockchain(onBlockArrivedGenerator(3));
    node.chain.subscribeBlockchain(onBlockArrivedGenerator(4));
    node.chain.subscribeBlockchain(onBlockArrivedGenerator(5));
    node.chain.subscribeBlockchain(onBlockArrivedGenerator(6));
    node.chain.subscribeBlockchain(onBlockArrivedGenerator(7));
    node.chain.subscribeBlockchain(onBlockArrivedGenerator(8));
    node.chain.subscribeBlockchain(onBlockArrivedGenerator(9));

    node.chain.subscribeTransaction(onTransactionArrivedGenerator(0));
    node.chain.subscribeTransaction(onTransactionArrivedGenerator(1));
    node.chain.subscribeTransaction(onTransactionArrivedGenerator(2));
    node.chain.subscribeTransaction(onTransactionArrivedGenerator(3));
    node.chain.subscribeTransaction(onTransactionArrivedGenerator(4));
    node.chain.subscribeTransaction(onTransactionArrivedGenerator(5));
    node.chain.subscribeTransaction(onTransactionArrivedGenerator(6));
    node.chain.subscribeTransaction(onTransactionArrivedGenerator(7));
    node.chain.subscribeTransaction(onTransactionArrivedGenerator(8));
    node.chain.subscribeTransaction(onTransactionArrivedGenerator(9));

    while (running_) {
        await sleep(1000);
    }

    console.log("Shutting down ...");

    node.close();
    console.log("Good bye!");
}

function shutdown() {
    console.log('Graceful shutdown ...');
    running_ = false;
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

(async () => {
    try {
        await main();
    } catch (e) {
        console.log(e);
    }
})();
