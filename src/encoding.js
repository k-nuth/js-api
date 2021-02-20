// Copyright (c) 2016-2020 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

"use strict";

function byteToHexString(uint8arr) {
    if (!uint8arr) {
        return '';
    }

    var hexStr = '';
    for (var i = 0; i < uint8arr.length; i++) {
        var hex = (uint8arr[i] & 0xff).toString(16);
        hex = (hex.length === 1) ? '0' + hex : hex;
        hexStr += hex;
    }

    return hexStr.toLowerCase();
}

function hexStringToByte(str) {
    if (!str) {
        return new Uint8Array();
    }

    var a = [];
    for (var i = 0, len = str.length; i < len; i+=2) {
        a.push(parseInt(str.substr(i,2),16));
    }

    return new Uint8Array(a);
}

function reverseStr(s){
    return s.split("").reverse().join("");
}

class Hash {
    static bytesToStr(arr) {
        const reversed = [...arr];
        reversed.reverse();
        return byteToHexString(reversed);
    }

    static strToBytes(s) {
        return hexStringToByte(s).reverse();
    }
}

exports.byteToHexString = byteToHexString;
exports.hexStringToByte = hexStringToByte;
exports.reverseStr = reverseStr;
exports.Hash = Hash;
