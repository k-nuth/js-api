const blockchainSettings = require('../../src/config/blockchainSettings');
const network = require('../../src/config/network');
const enc = require('../../src/encoding');

test('read default mainnet settings', () => {
    const settings = blockchainSettings.getDefault(network.Network.mainnet);
    expect(settings.cores).toBe(0);
    expect(settings.priority).toBe(true);

    expect(settings.byteFeeSatoshis).toBeCloseTo(0.1);
    expect(settings.sigopFeeSatoshis).toBe(100.0);
    expect(settings.minimumOutputSatoshis).toBe(500);
    expect(settings.notifyLimitHours).toBe(24);
    expect(settings.reorganizationLimit).toBe(256);

    expect(settings.checkpoints.length).toBe(79);
    expect(settings.checkpoints[0].height).toBe(0);
    expect(enc.Hash.bytesToStr(settings.checkpoints[0].hash)).toBe(
        '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'
    );

    expect(settings.fixCheckpoints).toBe(true);
    expect(settings.allowCollisions).toBe(true);
    expect(settings.easyBlocks).toBe(false);
    expect(settings.retarget).toBe(true);
    expect(settings.bip16).toBe(true);
    expect(settings.bip30).toBe(true);
    expect(settings.bip34).toBe(true);
    expect(settings.bip66).toBe(true);
    expect(settings.bip65).toBe(true);
    expect(settings.bip90).toBe(true);
    expect(settings.bip68).toBe(true);
    expect(settings.bip112).toBe(true);
    expect(settings.bip113).toBe(true);
    expect(settings.bchUahf).toBe(true);
    expect(settings.bchDaaCw144).toBe(true);
    expect(settings.bchPythagoras).toBe(true);
    expect(settings.bchEuclid).toBe(true);
    expect(settings.bchPisano).toBe(true);
    expect(settings.bchMersenne).toBe(true);
    expect(settings.bchFermat).toBe(true);
    expect(settings.bchEuler).toBe(true);
    expect(settings.bchGauss).toBe(true);
    expect(settings.bchDescartes).toBe(true);
    expect(settings.bchLobachevski).toBe(true);

    expect(settings.galoisActivationTime).toBe(1747310400);
    expect(settings.leibnizActivationTime).toBe(1778846400);

    expect(settings.asertHalfLife).toBe(2 * 24 * 60 * 60); //two days
});

test('read default testnet4 settings', () => {
    const settings = blockchainSettings.getDefault(network.Network.testnet4);
    expect(settings.cores).toBe(0);
    expect(settings.priority).toBe(true);

    expect(settings.byteFeeSatoshis).toBeCloseTo(0.1);
    expect(settings.sigopFeeSatoshis).toBe(100.0);
    expect(settings.minimumOutputSatoshis).toBe(500);
    expect(settings.notifyLimitHours).toBe(24);
    expect(settings.reorganizationLimit).toBe(256);

    expect(settings.checkpoints.length).toBe(18);
    expect(settings.checkpoints[0].height).toBe(0);
    expect(enc.Hash.bytesToStr(settings.checkpoints[0].hash)).toBe(
        '000000001dd410c49a788668ce26751718cc797474d3152a5fc073dd44fd9f7b'
    );

    expect(settings.fixCheckpoints).toBe(true);
    expect(settings.allowCollisions).toBe(true);
    expect(settings.easyBlocks).toBe(true);
    expect(settings.retarget).toBe(true);
    expect(settings.bip16).toBe(true);
    expect(settings.bip30).toBe(true);
    expect(settings.bip34).toBe(true);
    expect(settings.bip66).toBe(true);
    expect(settings.bip65).toBe(true);
    expect(settings.bip90).toBe(true);
    expect(settings.bip68).toBe(true);
    expect(settings.bip112).toBe(true);
    expect(settings.bip113).toBe(true);
    expect(settings.bchUahf).toBe(true);
    expect(settings.bchDaaCw144).toBe(true);
    expect(settings.bchPythagoras).toBe(true);
    expect(settings.bchEuclid).toBe(true);
    expect(settings.bchPisano).toBe(true);
    expect(settings.bchMersenne).toBe(true);
    expect(settings.bchFermat).toBe(true);
    expect(settings.bchEuler).toBe(true);
    expect(settings.bchGauss).toBe(true);
    expect(settings.bchDescartes).toBe(true);
    expect(settings.bchLobachevski).toBe(true);

    expect(settings.galoisActivationTime).toBe(1747310400);
    expect(settings.leibnizActivationTime).toBe(1778846400);

    expect(settings.asertHalfLife).toBe(60 * 60); //one hour
});

test('read default chipnet settings', () => {
    const settings = blockchainSettings.getDefault(network.Network.chipnet);
    expect(settings.cores).toBe(0);
    expect(settings.priority).toBe(true);

    expect(settings.byteFeeSatoshis).toBeCloseTo(0.1);
    expect(settings.sigopFeeSatoshis).toBe(100.0);
    expect(settings.minimumOutputSatoshis).toBe(500);
    expect(settings.notifyLimitHours).toBe(24);
    expect(settings.reorganizationLimit).toBe(256);

    expect(settings.checkpoints.length).toBe(14);
    expect(settings.checkpoints[0].height).toBe(0);
    expect(enc.Hash.bytesToStr(settings.checkpoints[0].hash)).toBe(
        '000000001dd410c49a788668ce26751718cc797474d3152a5fc073dd44fd9f7b'
    );

    expect(settings.fixCheckpoints).toBe(true);
    expect(settings.allowCollisions).toBe(true);
    expect(settings.easyBlocks).toBe(true);
    expect(settings.retarget).toBe(true);
    expect(settings.bip16).toBe(true);
    expect(settings.bip30).toBe(true);
    expect(settings.bip34).toBe(true);
    expect(settings.bip66).toBe(true);
    expect(settings.bip65).toBe(true);
    expect(settings.bip90).toBe(true);
    expect(settings.bip68).toBe(true);
    expect(settings.bip112).toBe(true);
    expect(settings.bip113).toBe(true);
    expect(settings.bchUahf).toBe(true);
    expect(settings.bchDaaCw144).toBe(true);
    expect(settings.bchPythagoras).toBe(true);
    expect(settings.bchEuclid).toBe(true);
    expect(settings.bchPisano).toBe(true);
    expect(settings.bchMersenne).toBe(true);
    expect(settings.bchFermat).toBe(true);
    expect(settings.bchEuler).toBe(true);
    expect(settings.bchGauss).toBe(true);
    expect(settings.bchDescartes).toBe(true);
    expect(settings.bchLobachevski).toBe(true);

    expect(settings.galoisActivationTime).toBe(1747310400);
    expect(settings.leibnizActivationTime).toBe(1778846400);

    expect(settings.asertHalfLife).toBe(60 * 60); //one hour
});
