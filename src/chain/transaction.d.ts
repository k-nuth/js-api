// Copyright (c) 2016-2021 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

import { Output } from './output';
import { Input } from './input'; 
import { Result } from '../result'; 

export declare class Transaction {
  constructor(version: number, locktime: number, inputs: Input[], outputs: Output[]); 

  toNative(): any; 

  get hash(): Uint8Array; 

  rawData(wire: boolean): Uint8Array;
}

export declare function fromNative(native: any, destroy: boolean): Transaction; 

export declare function fromData(version: number, data: Uint8Array): Result<Transaction>; 

export declare function toData(obj: Transaction, wire: boolean): Uint8Array; 

export declare function hash(obj: Transaction): Uint8Array; 

export declare function destruct(native: any): void;
