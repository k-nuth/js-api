// Copyright (c) 2016-2020 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

// test.js
const addon = require('./build/Release/addon');

// ----------------------------------------------------

// const obj1 = addon('hello');
// const obj2 = addon('world');
//
// console.log(obj1.msg, obj2.msg);

// ----------------------------------------------------

var external_int_ptr = addon.make_data();
addon.change_data(external_int_ptr);
console.log(addon.receive_data(external_int_ptr));

// ----------------------------------------------------
