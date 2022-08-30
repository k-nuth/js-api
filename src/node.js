// Copyright (c) 2016-2022 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('@knuth/bch-native');
const Promise = require('bluebird');
const chain = require('./chain/chain');

const async_node = {
    init_run_and_wait_for_signal: (...args) => {
        return new Promise((resolve) => {
            kth.node_init_run_and_wait_for_signal(...args, (err) => {
                resolve(err);
            });
        });
    }
};

class Node {
    constructor(settings, stdoutEnabled) {
        this.native = kth.node_construct(settings, stdoutEnabled);
    }

    get chain() {
        if (!this.native) return undefined;
        const res = new chain.Chain(kth.node_get_chain(this.native));
        return res;
    }

    close() {
        kth.node_signal_stop(this.native);
        kth.node_destruct(this.native);
        this.native = null;
    }

    async launch(mods) {
        const res = await async_node.init_run_and_wait_for_signal(this.native, mods);
        return res;
    }
}

exports.Node = Node;
