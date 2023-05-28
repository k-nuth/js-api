// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

/* eslint-disable */

const kth = require("@knuth/bch")

let running_ = false;

async function main() {
    process.on('SIGINT', shutdown);
    const config = kth.settings.getDefault(kth.network.mainnet);
    const node = new kth.node.Node(config, false);
    await node.launch(kth.startModules.all);
    console.log("Knuth node has been launched.");
    running_ = true;

    const [_, height] = await node.chain.getLastHeight();
    console.log(`Current height in local copy: ${height}`);

    if (await comeBackAfterTheBCHHardFork(node)) {
        console.log("Bitcoin Cash has been created!");
    }

    node.close();
    console.log("Good bye!");
}

async function comeBackAfterTheBCHHardFork(node) {
    const hfHeight = 478559;
    while (running_) {
        const [_, height] = await node.chain.getLastHeight();
        if (height >= hfHeight) return true;
        await sleep(10000);
    }
    return false;
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
