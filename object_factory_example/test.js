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
