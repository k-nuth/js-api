// test_native.js

const kth = require('./build/Release/kth');

const executor = kth.construct("hola", process.stdin, process.stdout, process.stderr);
// kth.initchain(executor);
kth.run(executor);
kth.destruct(executor);

