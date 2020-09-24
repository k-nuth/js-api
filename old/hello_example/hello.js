// Copyright (c) 2016-2020 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

// hello.js
// const addon = require('./build/Release/addon');
// console.log(addon.hello());

console.log(process.stdin.fd);
console.log(process.stdout.fd);
console.log(process.stderr.fd);

