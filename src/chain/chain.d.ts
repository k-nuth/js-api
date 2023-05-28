// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

import { Block } from "./block";
import { Header } from "./header";
import { Transaction } from "./transaction";

export declare class Chain {
    constructor(native : any);

    getLastHeight() : Promise<[number, number]>;
    getBlockHeight(hash : Uint8Array) : Promise<[number, number]>;

    getBlockHeaderByHeight(height : number) : Promise<[number, Header, number]>;
    getBlockHeaderByHash(hash : Uint8Array) : Promise<[number, Header, number]>;

    getBlockByHeight(height : number) : Promise<[number, Block, number]>;
    getBlockByHash(hash : Uint8Array) : Promise<[number, Block, number]>;

    getTransaction(hash : Uint8Array, requireConfirmed : boolean) : Promise<[number, Transaction, number, number]>;
    getTransactionPosition(hash : Uint8Array, requireConfirmed : boolean) : Promise<[number, number, number]>;

    // Organizers
    organizeBlock(block : Block) : Promise<number>;
    organizeTransaction(transaction : Transaction) : Promise<number>;
}
