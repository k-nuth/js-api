export declare function bytesToHexStr(uint8arr: Uint8Array): string; 

export declare function hexStrToBytes(str: string): Uint8Array;

export declare function reverseStr(s: string): string; 

export declare function fix(arr: number[]): Uint8Array;

export namespace Hash {
  export function bytesToStr(arr: number[]): string;
  export function strToBytes(s: string): Uint8Array; 
  export function  nullHash(): Uint8Array; 
}