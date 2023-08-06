// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

/* eslint-disable */

// const kth = require("@knuth/bch")
const kth = require('../src/kth');

let running_ = false;

async function main() {
    process.on('SIGINT', shutdown);
    const config = kth.settings.getDefault(kth.network.chipnet);
    const node = new kth.node.Node(config, false);
    await node.launch(kth.startModules.all);
    console.log("Knuth node has been launched.");
    running_ = true;

    node.chain.subscribeBlockchain((e, height, incomingBlocks, outgoingBlocks) => {
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

        if (outgoingBlocks && outgoingBlocks.length > 0) {
            console.log("outgoingBlocks: ", outgoingBlocks);
        }

        return true;
    });

    node.chain.subscribeTransaction((e, tx) => {
        if (e !== kth.errors.success) {
            console.log(`Error: ${e}`);
            return false;
        }

        if ( ! running_) {
            return false;
        }


        if (tx !== null) {
            console.log("Received Transaction: ", tx);
        }

        return true;
    });


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
