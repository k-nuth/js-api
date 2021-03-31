// Copyright (c) 2016-2021 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

import { Script } from './script'; 
import { Result } from '../result'; 

export declare class Output { 
  constructor(value: number, script: Script); 

  toNative(): any;

  rawData(wire: boolean): Uint8Array; 
}

export declare function fromNative(native: any, destroy: boolean): Output;

export declare function fromData(data: Uint8Array): Result<Output>; 

export declare function toData(obj: Output, wire: boolean): Uint8Array;

export declare function destruct(native: any): void; 