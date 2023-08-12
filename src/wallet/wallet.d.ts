// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

import { Result } from '../result';

export declare class Wallet {
    constructor(mnemonic: string[], derivationPath: string, network?: string);

    readonly rootKey: string;
    readonly extendedPrivateKey: string;
    readonly extendedPublicKey: string;

    getAddress(index: number): PaymentAddress;
    getAddresses(count?: number): PaymentAddress[];

    deriveAccount(derivationPath: string): Wallet;

    //TODO: static generate(): Wallet;
    //TODO: static isValidMnemonic(mnemonic: string[]): boolean;
    //TODO: mnemonic(): string[];
    //TODO: toPublic(): Wallet;
}

// Si la clase PaymentAddress está en un archivo separado, deberías importarla así:
import { PaymentAddress } from './paymentAddress';

