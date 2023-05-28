// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

import { Script } from './script';
import { OutputPoint } from './outputPoint';
import { Result } from '../result';

export declare class Input {
  constructor(previousOutpoint: OutputPoint, script: Script, sequence: number);

  toNative(): any;

  rawData(wire: boolean): Uint8Array;
}

export declare function fromNative(native: any, destroy: boolean): Input;

export declare function fromData(data: Uint8Array): Result<Input>;

export declare function toData(obj: Input, wire: boolean): Uint8Array;

export declare function destruct(native: any): void;