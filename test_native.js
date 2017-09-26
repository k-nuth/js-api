// test_native.js

const bitprim = require('./build/Release/bitprim');

const executor = bitprim.construct("hola", process.stdin, process.stdout, process.stderr);
// bitprim.initchain(executor);
bitprim.run(executor);
bitprim.destruct(executor);

