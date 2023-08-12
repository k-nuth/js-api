// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

import { LazySequence } from '../utils/lazySequence';
import { PaymentAddress } from './paymentAddress';

export declare class Wallet {
    constructor(mnemonic: string[], derivationPath: string, network?: string);

    readonly rootKey: string;
    readonly extendedPrivateKey: string;
    readonly extendedPublicKey: string;

    getAddress(index: number): PaymentAddress;
    getAddresses(count?: number): PaymentAddress[];
    generateAddresses(): LazySequence<PaymentAddress>;

    deriveAccount(derivationPath: string): Wallet;

    //TODO: static generate(): Wallet;
    //TODO: static isValidMnemonic(mnemonic: string[]): boolean;
    //TODO: mnemonic(): string[];
    //TODO: toPublic(): Wallet;
}



