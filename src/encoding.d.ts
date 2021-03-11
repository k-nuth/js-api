// Copyright (c) 2016-2021 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

export declare function bytesToHexStr(uint8arr: Uint8Array): string; 

export declare function hexStrToBytes(str: string): Uint8Array;

export declare function reverseStr(s: string): string; 

export declare function fix(arr: number[]): Uint8Array;

export namespace Hash {
  export function bytesToStr(arr: Uint8Array): string;
  export function strToBytes(s: string): Uint8Array; 
  export function  nullHash(): Uint8Array; 
}