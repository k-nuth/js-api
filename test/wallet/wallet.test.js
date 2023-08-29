// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const { Wallet } = require('../../src/wallet/wallet');
const { PaymentAddress } = require('../../src/wallet/paymentAddress');

describe('Wallet', () => {
    const TEST_MNEMONIC = [
        'car', 'slab', 'tail', 'dirt', 'wife', 'custom', 'front',
        'shield', 'diet', 'pear', 'skull', 'vapor', 'gorilla', 'token', 'yard'
    ];

    const TEST_DERIVATION_PATH = "m/44'/145'/0'/0";
    const TEST_NETWORK = 'MAINNET';     //'TESTNET';

    let wallet;

    beforeEach(() => {
        wallet = new Wallet(TEST_MNEMONIC, TEST_DERIVATION_PATH, TEST_NETWORK);
    });

    test('should correctly instantiate with given mnemonic, derivation path, and network', () => {
        expect(wallet).toBeInstanceOf(Wallet);
    });

    test('rootKey should return expected BIP32 root key', () => {
        const rootKey = wallet.rootKey;
        expect(typeof rootKey).toBe('string');
        expect(rootKey).toBe('xprv9s21ZrQH143K2DQjFCenT6uLwd7dNoMKXEsiQ2v5EkNFGd54wN9td5GnDKLR1amKpXFPwHBHdUNL3uowUZd4jZtFEbSG73wEyPrYn9sfbNN');
    });

    test('extendedPrivateKey should return expected extended private key', () => {
        const extPrivateKey = wallet.extendedPrivateKey;
        expect(typeof extPrivateKey).toBe('string');
        expect(extPrivateKey).toBe('xprvA2NTL1ZqHfcTbSbCXeRcuUWo9jib7TroFrQSMFyNS4YpSCs8Aqi23nPQHiQC6SVNXp68AFQLU5Nt2CEKjBmtaFhYdBTGhd7tydWxKhWzSc7');
    });

    test('extendedPublicKey should return expected extended public key', () => {
        const extPublicKey = wallet.extendedPublicKey;
        expect(typeof extPublicKey).toBe('string');
        expect(extPublicKey).toBe('xpub6FMojX6j83AkovffdfxdGcTXhmZ5Wvaed5L39eNyzQ5oK1CGiP2Gbaht8yTEBM2rfGMpNnkkXiQkhUKJnnrc31yLgvmimYWEhXdGXwy16eW');
    });

    test('getAddress should return PaymentAddress instance for given index', () => {
        const address = wallet.getAddress(0);
        expect(address).toBeInstanceOf(PaymentAddress);
        expect(address.encoded()).toBe('bitcoincash:qr9sawzzmstkluq9nqefsu7eqya4zk2w7udune2pmf');
    });

    test('getAddresses should return array of PaymentAddress instances', () => {
        const addresses = wallet.getAddresses(5);
        expect(Array.isArray(addresses)).toBeTruthy();
        expect(addresses).toHaveLength(5);

        expect(addresses.map(a => a.encoded())).toStrictEqual([
            'bitcoincash:qr9sawzzmstkluq9nqefsu7eqya4zk2w7udune2pmf',
            'bitcoincash:qpvmwrhxcdyyq64ar6kz46rejp0r2tjcwg8d462hum',
            'bitcoincash:qqftgwpz0wm45z3sumncfrzm0s3n7x5rcqq9350gd6',
            'bitcoincash:qrwelh5dw56rjnr3nnttfc45j0p0yv2a3vtuwu9nlt',
            'bitcoincash:qpawyf7fp6lhvhld5gtz74smm969fx2j2546uj60l0'])
    });


    describe('generateAddresses generator', () => {
        it('should lazily generate addresses', () => {
            const addresses = wallet.generateAddresses();
            expect(addresses.take(5).map(a => a.encoded()).toArray()).toStrictEqual([
                'bitcoincash:qr9sawzzmstkluq9nqefsu7eqya4zk2w7udune2pmf',
                'bitcoincash:qpvmwrhxcdyyq64ar6kz46rejp0r2tjcwg8d462hum',
                'bitcoincash:qqftgwpz0wm45z3sumncfrzm0s3n7x5rcqq9350gd6',
                'bitcoincash:qrwelh5dw56rjnr3nnttfc45j0p0yv2a3vtuwu9nlt',
                'bitcoincash:qpawyf7fp6lhvhld5gtz74smm969fx2j2546uj60l0'
            ]);
        });
    });


    // test('deriveAccount should return a new Wallet instance with new derivation path', () => {
    //     const newDerivationPath = "m/44'/0'/0'/0";
    //     const derivedWallet = wallet.deriveAccount(newDerivationPath);
    //     expect(derivedWallet).toBeInstanceOf(Wallet);
    //     expect(derivedWallet.derivationPath).toBe(newDerivationPath);
    // });
});

