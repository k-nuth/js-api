export declare class Header { 
  constructor(version: number, previousBlockHash: Uint8Array, merkle: Uint8Array, timestamp: number , bits: number, nonce: number); 

  toNative(): any; /* TODO(Nicolás): Check with Fernando which is the correct return type */

  get hash(): Uint8Array; 

  rawData(version: number): Uint8Array; 
}