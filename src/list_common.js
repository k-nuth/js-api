
// Copyright (c) 2016-2020 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

"use strict";

const create = function(globalModule, elemModule, namespace, klass) {
    let construct = globalModule[`${namespace}_${klass}_list_construct_default`];
    let push = globalModule[`${namespace}_${klass}_list_push_back`];
    let destructList = globalModule[`${namespace}_${klass}_list_destruct`];
    let length = globalModule[`${namespace}_${klass}_list_count`];
    let nth = globalModule[`${namespace}_${klass}_list_nth`];
    let fromNativeElem = elemModule.fromNative;
    let destructElem = elemModule.destruct;

    return createInternal(construct, length, nth, push, destructList, fromNativeElem, destructElem);
}

const createInternal = function(construct, length, nth, push, destructList, fromNativeElem, destructElem) {
    const ret = {
        fromNative: function(native, destroy = false) {
            let ret = [];
            const n = length(native);
        
            for (let i = 0; i < n; ++i) {
                const native_elem = nth(native, i);
                const elem = fromNativeElem(native_elem);
                ret.push(elem);
            }
        
            if (destroy) {
                destructList(native);    
            }
            return ret;
        },
        toNative: function(list) {
            const native = construct();
            for (let i = 0; i < list.length; ++i) {
                const element = list[i];
                const native_elem = element.toNative();
                push(native, native_elem);
                destructElem(native_elem)
            }
            return native;
        },
        destruct: destructList      
    };
    return ret;
}

exports.create = create;
