// Copyright (c) 2016-2022 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const template = (methods) => {
    return {
        fromNative: (native, destroy = false) => {
            let arr = [];
            const n = methods.count(native);
            for (let i = 0; i < n; ++i) {
                const elementNative = methods.nth(native, i);
                const element = methods.fromNative(elementNative);
                arr.push(element);
            }

            if (destroy) {
                methods.destruct(native);
            }
            return arr;
        },

        toNative: (arr) => {
            const native = methods.constructDefault();

            for (let i = 0; i < arr.length; ++i) {
                const element = arr[i];
                const elementNative = element.toNative();
                methods.pushBack(native, elementNative);
            }
            return native;
        },

        destruct: (native) => {
            methods.destruct(native);
        }
    };
};

exports.template = template;
