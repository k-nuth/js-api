// Copyright (c) 2016-2022 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

import { Result } from '../result';
import { Header } from './header';
import { Transaction } from './transaction'

export declare class Block {
  constructor(header: Header, transactions: Transaction[]);

  toNative(): any;

  get hash(): Uint8Array;

  rawData(wire: boolean): Uint8Array;
}

export declare function fromNative(native: any, destroy: boolean): Block;

export declare function fromData(version: number, data: Uint8Array): Result<Block>;

export declare function toData(obj: Block, wire: boolean): Uint8Array;

export declare function hash(obj: Block): Uint8Array;

export declare function destruct(native: any): void;