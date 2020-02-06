// Copyright (c) 2016-2020 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

// test_native.js

const kth = require('./build/Release/kth');

const executor = kth.construct("hola", process.stdin, process.stdout, process.stderr);
// kth.initchain(executor);
kth.run(executor);
kth.destruct(executor);

