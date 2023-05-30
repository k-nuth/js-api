// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const express = require('express');
const path = require('path');
const app = express();
// const kth = require("@knuth/bch");
const kth = require('../../src/kth');

app.use(express.static(path.join(__dirname, '.')));

let running_ = false;
let lastBlockHeight = 0; // to store last block height

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

app.get('/sse-endpoint', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    res.write(`event: blockheight\ndata: ${lastBlockHeight}\n\n`);
    let lastSentHeight = lastBlockHeight;

    const intervalId = setInterval(() => {
        if (lastSentHeight !== lastBlockHeight) {
            res.write(`event: blockheight\ndata: ${lastBlockHeight}\n\n`);
            lastSentHeight = lastBlockHeight;
        }
    }, 500);

    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
});

const server = app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

async function main() {
    process.on('SIGINT', shutdown);
    const config = kth.settings.getDefault(kth.network.chipnet);
    const node = new kth.node.Node(config, true);
    await node.launch(kth.startModules.all);
    console.log("Knuth node has been launched.");
    running_ = true;

    const [_, height] = await node.chain.getLastHeight();
    lastBlockHeight = height;

    node.chain.subscribeBlockchain((e, height, incomingBlocks, outgoingBlocks) => {
        // console.log("subscribeBlockchain: ", e, height, incomingBlocks, outgoingBlocks);
        if (e !== kth.errors.success) {
            console.log(`Error: ${e}`);
            return false;
        }

        if ( ! running_) {
            console.log("Not running, returning false");
            return false;
        }

        if (incomingBlocks && incomingBlocks.length > 0) {
            lastBlockHeight = height + incomingBlocks.length;
            console.log(`${new Date().toISOString()} - Received new block. Height: ${lastBlockHeight}`);
        }

        // console.log("returning true");
        return true;
    });

    while (running_) {
        // console.log("sleeping...")
        await sleep(1000);
    }

    console.log("Shutting down Knuth node...");
    node.close();
    console.log("Shutting down Web server...");

    server.close(() => {
        console.log("Good bye!");
        process.exit();
    });
}

function shutdown() {
    console.log('');
    console.log('Ctrl+C detected.');
    running_ = false;
}

(async () => {
    try {
        await main();
    } catch (e) {
        console.log(e);
    }
})();
