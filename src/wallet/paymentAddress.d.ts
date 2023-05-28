// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

import { Result } from '../result';

export declare class PaymentAddress {
    constructor(addressStr: string);

    toNative(): any;

    get hash(): Uint8Array;

    get version(): number;

    encoded(): string;

    encodedCashAddr(): string;

    encodedLegacy(): string;
}

export declare function fromNative(native: any, destroy: boolean): PaymentAddress;

export declare function fromData(addressStr: string): Result<PaymentAddress>;

export declare function isValid(addressStr: string): boolean;

export declare function encodedLegacy(obj: PaymentAddress): string;

export declare function encodedCashAddr(obj: PaymentAddress): string;

export declare function hash(obj: PaymentAddress): Uint8Array;

export declare function version(obj: PaymentAddress): number;

export declare function destruct(native: any): void;
