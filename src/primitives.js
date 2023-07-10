// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const StartModules = Object.freeze({
    all: 0,
    justChain: 1,
    justP2P: 2
});

const DbMode = Object.freeze({
    pruned: 0,
    normal: 1,
    fullIndexed: 2
});

exports.StartModules = StartModules;
exports.DbMode = DbMode;
