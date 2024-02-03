// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('@knuth/bch-native');

const paymentAddress = require('./paymentAddress');
const { LazySequence } = require('../utils/lazySequence');

class Wallet {
    constructor(mnemonic, derivationPath, network = 'MAINNET') {
        if ( ! derivationPath) {
            throw new Error('Derivation path is required.');
        }

        this.mnemonic = mnemonic;
        this.derivationPath = derivationPath;
        this.network = network;

        this._initialize();

        this.resetPerformance();
    }


    _initialize() {
        const wl = kth.core_string_list_construct();
        this.mnemonic.forEach(word => {
            kth.core_string_list_push_back(wl, word);
        });

        this.seed = kth.wallet_mnemonics_to_seed(wl);
        // console.log('seed: ', this.seed);

        const version = this.network === 'MAINNET' ? 326702167824577054n : 303293221666392015n;
        this.master = kth.wallet_hd_private_construct_seed(this.seed, version);

        const paths = this.derivationPath.split('/');
        this.lastDerived = paths.reduce((prevKey, pathChunk) => {
            if (pathChunk === 'm') {
                return prevKey;
            }
            const hardened = pathChunk.endsWith("'");
            const index = parseInt(pathChunk, 10);
            if (isNaN(index)) {
                throw new Error('Invalid derivation path.');
            }

            if (hardened) {
                return kth.wallet_hd_private_derive_private(prevKey, index + 0x80000000);
            } else {
                return kth.wallet_hd_private_derive_private(prevKey, index);
            }
        }, this.master);
    }

    get rootKey() {
        return kth.wallet_hd_private_encoded(this.master);
    }

    get extendedPrivateKey() {
        return kth.wallet_hd_private_encoded(this.lastDerived);
    }

    get extendedPublicKey() {
        return kth.wallet_hd_public_encoded(kth.wallet_hd_private_to_public(this.lastDerived));
    }

    resetPerformance() {
        this.time_wallet_hd_private_derive_private = 0;
        this.time_wallet_hd_private_secret = 0;
        this.time_wallet_secret_to_public = 0;
        this.time_wallet_ec_public_construct_from_point = 0;
        this.time_wallet_ec_public_to_payment_address = 0;
        this.time_paymentAddress_fromNative = 0;
    }

    getAddress(index) {
        let start = process.hrtime();
        const key = kth.wallet_hd_private_derive_private(this.lastDerived, index);
        let end = process.hrtime(start);
        this.time_wallet_hd_private_derive_private += end[1];

        start = process.hrtime();
        const secret = kth.wallet_hd_private_secret(key);
        end = process.hrtime(start);
        this.time_wallet_hd_private_secret += end[1];

        start = process.hrtime();
        const point = kth.wallet_secret_to_public(secret);
        end = process.hrtime(start);
        this.time_wallet_secret_to_public += end[1];

        start = process.hrtime();
        const ecp = kth.wallet_ec_public_construct_from_point(point, true);
        end = process.hrtime(start);
        this.time_wallet_ec_public_construct_from_point += end[1];


        start = process.hrtime();
        const nativePA = kth.wallet_ec_public_to_payment_address(ecp, this.network === 'MAINNET' ? 0x00 : 0x05);
        end = process.hrtime(start);
        this.time_wallet_ec_public_to_payment_address += end[1];

        start = process.hrtime();
        const res = paymentAddress.fromNative(nativePA);
        end = process.hrtime(start);
        this.time_paymentAddress_fromNative += end[1];

        return res;
    }

    printPerformance() {
        console.log(`wallet_hd_private_derive_private:      ${this.time_wallet_hd_private_derive_private/1000}µs`);
        console.log(`wallet_hd_private_secret:              ${this.time_wallet_hd_private_secret/1000}µs`);
        console.log(`wallet_secret_to_public:               ${this.time_wallet_secret_to_public/1000}µs`);
        console.log(`wallet_ec_public_construct_from_point: ${this.time_wallet_ec_public_construct_from_point/1000}µs`);
        console.log(`wallet_ec_public_to_payment_address:   ${this.time_wallet_ec_public_to_payment_address/1000}µs`);
        console.log(`paymentAddress_fromNative:             ${this.time_paymentAddress_fromNative/1000}µs`);

        const total = this.time_wallet_hd_private_derive_private +
            this.time_wallet_hd_private_secret +
            this.time_wallet_secret_to_public +
            this.time_wallet_ec_public_construct_from_point +
            this.time_wallet_ec_public_to_payment_address +
            this.time_paymentAddress_fromNative;

        console.log(`Total:                                ${total/1000}µs`);
        console.log(`Total:                                ${total/1000000}ms`);
    }

    getAddresses(count = 20) {
        const addresses = [];
        for (let i = 0; i < count; i++) {
            addresses.push(this.getAddress(i));
        }
        return addresses;
    }

    // *generateAddresses() {
    //     let index = 0;
    //     while (true) {
    //         yield this.getAddress(index++);
    //     }
    // }

    generateAddresses() {
        const self = this;
        return new LazySequence(function*() {
            let index = 0;
            while (true) {
                yield self.getAddress(index++);
            }
        });
    }

    deriveAccount(derivationPath) {
        return new Wallet(this.mnemonic, derivationPath, this.network);
    }

    //TODO: Implement isValidMnemonic(mnemonic) function.
    //TODO: Implement generate() function.
    //TODO: Implement mnemonic() function.

    // This will return a new Wallet instance with only public info.
    // toPublic() {
    //     const pubWallet = new Wallet(null, this.derivationPath, this.network);
    //     pubWallet.master = kth.wallet_hd_private_to_public(this.master);
    //     pubWallet.lastDerived = kth.wallet_hd_private_to_public(this.lastDerived);
    //     return pubWallet;
    // }
}

exports.Wallet = Wallet;
