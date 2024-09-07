// Copyright (c) 2016-2024 Knuth Project developers.
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
        this.chain_ = null;
    }

    get chain() {
        if ( ! this.native) return undefined;
        if ( ! this.chain_) {
            this.chain_ = new chain.Chain(kth.node_get_chain(this.native), this.native);
        }
        return this.chain_;
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

    get capi_version() {
        return kth.node_capi_version();
    }

    get cppapi_version() {
        return kth.node_cppapi_version();
    }

    // get js_native_version() {
    //     return kth.node_js_native_version();   //TODO: implement on native side
    // }

    get version() {
        return process.env.npm_package_version;
    }

    get microarchitecture() {
        return kth.node_microarchitecture();
    }

    get march_names() {
        return kth.node_march_names();
    }

    get currency_symbol() {
        return kth.node_currency_symbol();
    }

    get currency() {
        return kth.node_currency();
    }

    // get db_type() {
    //     return kth.node_db_type();
    // }
}

exports.Node = Node;
