// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

/* eslint-disable */

// const kth = require("@knuth/bch")
// const kth = require('../src/kth');
const { Wallet } = require('../src/wallet/wallet');
const { PaymentAddress } = require('../src/wallet/paymentAddress');

async function main() {

    const TEST_MNEMONIC = [
        'car', 'slab', 'tail', 'dirt', 'wife', 'custom', 'front',
        'shield', 'diet', 'pear', 'skull', 'vapor', 'gorilla', 'token', 'yard'
    ];

    const TEST_DERIVATION_PATH = "m/44'/145'/0'/0";
    const TEST_NETWORK = 'MAINNET';

    const wallet = new Wallet(TEST_MNEMONIC, TEST_DERIVATION_PATH, TEST_NETWORK);
    const addresses = wallet.getAddresses(20000);

    const addrStr = addresses.map(a => a.encoded());
    console.log(addrStr);

    wallet.printPerformance();

}

(async () => {
    try {
        await main();
    } catch (e) {
        console.log(e);
    }
})();
