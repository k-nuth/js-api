// Copyright (c) 2016-2021 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

export declare class Script { 
  constructor(enconded: Uint8Array); 

  toNative(prefix: any): any; 

  rawData(): Uint8Array; 
}

export declare function fromNative(native: any, prefix: any, destroy: boolean): any; 