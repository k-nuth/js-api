// Copyright (c) 2016-2022 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const node = require('./node');

const enc = require('./encoding');
const primitives = require('./primitives');

const block = require('./chain/block');
const header = require('./chain/header');
const input = require('./chain/input');
const output = require('./chain/output');
const outputPoint = require('./chain/outputPoint');
const script = require('./chain/script');
const transaction = require('./chain/transaction');

const settings = require('./config/settings');
const sett_network = require('./config/network');
const err = require('../src/errors');

module.exports = {
    node,
    enc,
    errors: err.errors,

    startModules: primitives.StartModules,

    //Chain
    block,
    header,
    input,
    output,
    outputPoint,
    script,
    transaction,

    //Config
    settings,
    network: sett_network.Network
};
