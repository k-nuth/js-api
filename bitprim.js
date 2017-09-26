// bitprim.js

const bitprim_native = require('./build/Release/bitprim');

function ExecutorResource (executor) {
    this.executor = executor;
}

ExecutorResource.prototype.initchain = function() {
    return bitprim_native.initchain(this.executor)
};

ExecutorResource.prototype.stop = function() {
    bitprim_native.stop(this.executor)
};

// ExecutorResource.prototype.run = function() {
//     return bitprim_native.run(this.executor);
// };

ExecutorResource.prototype.run_wait = function() {
    const resX = bitprim_native.run_wait(this.executor)
    // console.log(`resX: ${resX}`)
    return resX
};

ExecutorResource.prototype.get_last_height = function() {
    return bitprim_native.get_last_height(this.executor);
};

ExecutorResource.prototype.validate_tx = function(tx_hex, callback) {
    return bitprim_native.validate_tx(this.executor, tx_hex, callback);
};

ExecutorResource.prototype.close = function() {
    bitprim_native.destruct(this.executor);
};



// function open(path, cb) {
//
//     // console.log('before bitprim_native.construct')
//     const executor_native = bitprim_native.construct(path, process.stdout, process.stderr);
//     // console.log('after bitprim_native.construct')
//
//     cb(new ExecutorResource(executor_native));
//
//     bitprim_native.destruct(executor_native);
// }

function open(path) {
    const executor_native = bitprim_native.construct(path, null, null);
    return new ExecutorResource(executor_native)
}

function openWithStd(path) {
    const executor_native = bitprim_native.construct(path, process.stdout, process.stderr);
    return new ExecutorResource(executor_native)
}

module.exports = {
    open:         open,
    openWithStd: openWithStd
};