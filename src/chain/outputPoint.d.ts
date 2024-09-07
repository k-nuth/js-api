// Copyright (c) 2016-2024 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

export declare class OutputPoint {
  constructor(hash: Uint8Array, index: number);

  toNative(): any;
}

export declare function fromNative(native: any, destroy: boolean): OutputPoint;

export declare function destruct(native: any): void;