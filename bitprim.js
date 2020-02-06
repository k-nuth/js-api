// Copyright (c) 2016-2020 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

// kth.js

const kth_native = require('./build/Release/kth');

function ExecutorResource (executor) {
    this.executor = executor;
}

ExecutorResource.prototype.initchain = function() {
    return kth_native.initchain(this.executor)
};

ExecutorResource.prototype.stop = function() {
    kth_native.stop(this.executor)
};

// ExecutorResource.prototype.run = function() {
//     return kth_native.run(this.executor);
// };

ExecutorResource.prototype.run_wait = function() {
    const resX = kth_native.run_wait(this.executor)
    // console.log(`resX: ${resX}`)
    return resX
};

ExecutorResource.prototype.get_last_height = function() {
    return kth_native.get_last_height(this.executor);
};

ExecutorResource.prototype.validate_tx = function(tx_hex, callback) {
    return kth_native.validate_tx(this.executor, tx_hex, callback);
};

ExecutorResource.prototype.close = function() {
    kth_native.destruct(this.executor);
};



// function open(path, cb) {
//
//     // console.log('before kth_native.construct')
//     const executor_native = kth_native.construct(path, process.stdout, process.stderr);
//     // console.log('after kth_native.construct')
//
//     cb(new ExecutorResource(executor_native));
//
//     kth_native.destruct(executor_native);
// }

function open(path) {
    const executor_native = kth_native.construct(path, null, null);
    return new ExecutorResource(executor_native)
}

function openWithStd(path) {
    const executor_native = kth_native.construct(path, process.stdout, process.stderr);
    return new ExecutorResource(executor_native)
}

module.exports = {
    open:         open,
    openWithStd: openWithStd
};