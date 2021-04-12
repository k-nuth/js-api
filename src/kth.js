// Copyright (c) 2016-2021 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const node = require('./node');
const enc = require('./encoding');

const block = require('./chain/block');
const header = require('./chain/header');
const input = require('./chain/input');
const output = require('./chain/output');
const outputPoint = require('./chain/outputPoint');
const script = require('./chain/script');
const transaction = require('./chain/transaction');

const settings = require('./config/settings');
const sett_network = require('./config/network');

class KTH {
    constructor() {
        this.node = node;
        this.enc = enc;

        this.block = block;
        this.header = header;
        this.input = input;
        this.output = output;
        this.outputPoint = outputPoint;
        this.script = script;
        this.transaction = transaction;

        this.settings = settings;
        this.network = sett_network.network;
        // const setts = settings.getDefault(network.network.mainnet);
    }
}

module.exports = new KTH();
