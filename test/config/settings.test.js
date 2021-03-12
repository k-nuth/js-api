const settings = require('../../src/config/settings');
const network = require('../../src/config/network');
const enc = require('../../src/encoding');

test('read default mainnet settings', () => {
    const setts = settings.getDefault(network.network.mainnet);

    expect(setts.chain.cores).toBe(0);
    expect(setts.chain.priority).toBe(true);
    expect(setts.chain.byteFeeSatoshis).toBeCloseTo(0.1);
    expect(setts.chain.sigopFeeSatoshis).toBe(100.0);
    expect(setts.chain.minimumOutputSatoshis).toBe(500);
    expect(setts.chain.notifyLimitHours).toBe(24);
    expect(setts.chain.reorganizationLimit).toBe(256);
    expect(setts.chain.checkpoints.length).toBe(64);
    expect(setts.chain.checkpoints[0].height).toBe(0);
    expect(enc.Hash.bytesToStr(setts.chain.checkpoints[0].hash)).toBe(
        '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'
    );
    expect(setts.chain.fixCheckpoints).toBe(true);
    expect(setts.chain.allowCollisions).toBe(true);
    expect(setts.chain.easyBlocks).toBe(false);
    expect(setts.chain.retarget).toBe(true);
    expect(setts.chain.bip16).toBe(true);
    expect(setts.chain.bip30).toBe(true);
    expect(setts.chain.bip34).toBe(true);
    expect(setts.chain.bip66).toBe(true);
    expect(setts.chain.bip65).toBe(true);
    expect(setts.chain.bip90).toBe(true);
    expect(setts.chain.bip68).toBe(true);
    expect(setts.chain.bip112).toBe(true);
    expect(setts.chain.bip113).toBe(true);
    expect(setts.chain.bchUahf).toBe(true);
    expect(setts.chain.bchDaaCw144).toBe(true);
    expect(setts.chain.bchPythagoras).toBe(true);
    expect(setts.chain.bchEuclid).toBe(true);
    expect(setts.chain.bchPisano).toBe(true);
    expect(setts.chain.bchMersenne).toBe(true);
    expect(setts.chain.bchFermat).toBe(true);
    expect(setts.chain.bchEuler).toBe(false);
    expect(setts.chain.bchGauss).toBe(false);
    expect(setts.chain.gaussActivationTime).toBe(1621080000);
    expect(setts.chain.asertHalfLife).toBe(2 * 24 * 60 * 60); //two days
    // ------------------------------------------------------------------------------------
    expect(setts.database.directory).toBe('blockchain');
    expect(setts.database.flushWrites).toBe(false);
    expect(setts.database.fileGrowthRate).toBe(50);
    expect(setts.database.indexStartHeight).toBe(0);
    expect(setts.database.reorgPoolLimit).toBe(100);
    expect(setts.database.dbMaxSize).toBe(600 * 1024 * 1024 * 1024);
    expect(setts.database.safeMode).toBe(true);
    expect(setts.database.cacheCapacity).toBe(0);
    // ------------------------------------------------------------------------------------
    expect(setts.network.threads).toBe(0);
    expect(setts.network.protocolMaximum).toBe(70015);
    expect(setts.network.protocolMinimum).toBe(31402);
    expect(setts.network.services).toBe(1);
    expect(setts.network.invalidServices).toBe(0);
    expect(setts.network.relayTransactions).toBe(true);
    expect(setts.network.validateChecksum).toBe(false);
    expect(setts.network.identifier).toBe(3908297187);
    expect(setts.network.inboundPort).toBe(8333);
    expect(setts.network.inboundConnections).toBe(0);
    expect(setts.network.outboundConnections).toBe(8);
    expect(setts.network.manualAttemptLimit).toBe(0);
    expect(setts.network.connectBatchSize).toBe(5);
    expect(setts.network.connectTimeoutSeconds).toBe(5);
    expect(setts.network.channelHandshakeSeconds).toBe(6000);
    expect(setts.network.channelHeartbeatMinutes).toBe(5);
    expect(setts.network.channelInactivityMinutes).toBe(10);
    expect(setts.network.channelExpirationMinutes).toBe(60);
    expect(setts.network.channelGerminationSeconds).toBe(30);
    expect(setts.network.hostPoolCapacity).toBe(1000);
    expect(setts.network.hostsFile).toBe('hosts.cache');
    // expect(setts.network.self.ip).toBe('0.0.0.0');
    expect(setts.network.self.port).toBe(0);
    expect(setts.network.blacklist.length).toBe(0);
    expect(setts.network.peers.length).toBe(0);
    expect(setts.network.seeds.length).toBe(6);
    expect(setts.network.seeds[0].scheme).toBe('');
    expect(setts.network.seeds[0].host).toBe('seed.flowee.cash');
    expect(setts.network.seeds[0].port).toBe(8333);
    expect(setts.network.debugFile).toBe('debug.log');
    expect(setts.network.errorFile).toBe('error.log');
    expect(setts.network.archiveDirectory).toBe('archive');
    expect(setts.network.rotationSize).toBe(0);
    expect(setts.network.minimumFreeSpace).toBe(0);
    expect(setts.network.maximumArchiveSize).toBe(0);
    expect(setts.network.maximumArchiveFiles).toBe(0);

    // Expected: "0.0.0.0"
    // Received: "[::ffff:0:0]"
    // expect(setts.network.statisticsServer.ip).toBe('0.0.0.0');

    expect(setts.network.statisticsServer.port).toBe(0);
    expect(setts.network.verbose).toBe(false);
    expect(setts.network.useIpv6).toBe(true);
    expect(setts.network.userAgentBlacklist.length).toBe(1);
    expect(setts.network.userAgentBlacklist[0]).toBe('/Bitcoin SV:');
    // ------------------------------------------------------------------------------------
    expect(setts.node.syncPeers).toBe(0);
    expect(setts.node.syncTimeoutSeconds).toBe(5);
    expect(setts.node.blockLatencySeconds).toBe(60);
    expect(setts.node.refreshTransactions).toBe(true);
    expect(setts.node.compactBlocksHighBandwidth).toBe(true);
});

test('read default testnet4 settings', () => {
    const setts = settings.getDefault(network.network.testnet4);

    expect(setts.chain.cores).toBe(0);
    expect(setts.chain.priority).toBe(true);
    expect(setts.chain.byteFeeSatoshis).toBeCloseTo(0.1);
    expect(setts.chain.sigopFeeSatoshis).toBe(100.0);
    expect(setts.chain.minimumOutputSatoshis).toBe(500);
    expect(setts.chain.notifyLimitHours).toBe(24);
    expect(setts.chain.reorganizationLimit).toBe(256);
    expect(setts.chain.checkpoints.length).toBe(18);
    expect(setts.chain.checkpoints[0].height).toBe(0);
    expect(enc.Hash.bytesToStr(setts.chain.checkpoints[0].hash)).toBe(
        '000000001dd410c49a788668ce26751718cc797474d3152a5fc073dd44fd9f7b'
    );
    expect(setts.chain.fixCheckpoints).toBe(true);
    expect(setts.chain.allowCollisions).toBe(true);
    expect(setts.chain.easyBlocks).toBe(true);
    expect(setts.chain.retarget).toBe(true);
    expect(setts.chain.bip16).toBe(true);
    expect(setts.chain.bip30).toBe(true);
    expect(setts.chain.bip34).toBe(true);
    expect(setts.chain.bip66).toBe(true);
    expect(setts.chain.bip65).toBe(true);
    expect(setts.chain.bip90).toBe(true);
    expect(setts.chain.bip68).toBe(true);
    expect(setts.chain.bip112).toBe(true);
    expect(setts.chain.bip113).toBe(true);
    expect(setts.chain.bchUahf).toBe(true);
    expect(setts.chain.bchDaaCw144).toBe(true);
    expect(setts.chain.bchPythagoras).toBe(true);
    expect(setts.chain.bchEuclid).toBe(true);
    expect(setts.chain.bchPisano).toBe(true);
    expect(setts.chain.bchMersenne).toBe(true);
    expect(setts.chain.bchFermat).toBe(true);
    expect(setts.chain.bchEuler).toBe(false);
    expect(setts.chain.bchGauss).toBe(false);
    expect(setts.chain.gaussActivationTime).toBe(1621080000);
    expect(setts.chain.asertHalfLife).toBe(60 * 60); // one hour
    // ------------------------------------------------------------------------------------
    expect(setts.database.directory).toBe('blockchain');
    expect(setts.database.flushWrites).toBe(false);
    expect(setts.database.fileGrowthRate).toBe(50);
    expect(setts.database.indexStartHeight).toBe(0);
    expect(setts.database.reorgPoolLimit).toBe(100);
    expect(setts.database.dbMaxSize).toBe(20 * 1024 * 1024 * 1024); // 20 GiB
    expect(setts.database.safeMode).toBe(true);
    expect(setts.database.cacheCapacity).toBe(0);
    // ------------------------------------------------------------------------------------
    expect(setts.network.threads).toBe(0);
    expect(setts.network.protocolMaximum).toBe(70015);
    expect(setts.network.protocolMinimum).toBe(31402);
    expect(setts.network.services).toBe(1);
    expect(setts.network.invalidServices).toBe(0);
    expect(setts.network.relayTransactions).toBe(true);
    expect(setts.network.validateChecksum).toBe(false);
    expect(setts.network.identifier).toBe(2950346722);
    expect(setts.network.inboundPort).toBe(28333);
    expect(setts.network.inboundConnections).toBe(0);
    expect(setts.network.outboundConnections).toBe(8);
    expect(setts.network.manualAttemptLimit).toBe(0);
    expect(setts.network.connectBatchSize).toBe(5);
    expect(setts.network.connectTimeoutSeconds).toBe(5);
    expect(setts.network.channelHandshakeSeconds).toBe(6000);
    expect(setts.network.channelHeartbeatMinutes).toBe(5);
    expect(setts.network.channelInactivityMinutes).toBe(10);
    expect(setts.network.channelExpirationMinutes).toBe(60);
    expect(setts.network.channelGerminationSeconds).toBe(30);
    expect(setts.network.hostPoolCapacity).toBe(1000);
    expect(setts.network.hostsFile).toBe('hosts.cache');
    // expect(setts.network.self.ip).toBe('0.0.0.0');
    expect(setts.network.self.port).toBe(0);
    expect(setts.network.blacklist.length).toBe(0);
    expect(setts.network.peers.length).toBe(0);
    expect(setts.network.seeds.length).toBe(3);
    expect(setts.network.seeds[0].scheme).toBe('');
    expect(setts.network.seeds[0].host).toBe('testnet4-seed-bch.bitcoinforks.org');
    expect(setts.network.seeds[0].port).toBe(28333);
    expect(setts.network.debugFile).toBe('debug.log');
    expect(setts.network.errorFile).toBe('error.log');
    expect(setts.network.archiveDirectory).toBe('archive');
    expect(setts.network.rotationSize).toBe(0);
    expect(setts.network.minimumFreeSpace).toBe(0);
    expect(setts.network.maximumArchiveSize).toBe(0);
    expect(setts.network.maximumArchiveFiles).toBe(0);

    // Expected: "0.0.0.0"
    // Received: "[::ffff:0:0]"
    // expect(setts.network.statisticsServer.ip).toBe('0.0.0.0');

    expect(setts.network.statisticsServer.port).toBe(0);
    expect(setts.network.verbose).toBe(false);
    expect(setts.network.useIpv6).toBe(true);
    expect(setts.network.userAgentBlacklist.length).toBe(1);
    expect(setts.network.userAgentBlacklist[0]).toBe('/Bitcoin SV:');
    // ------------------------------------------------------------------------------------
    expect(setts.node.syncPeers).toBe(0);
    expect(setts.node.syncTimeoutSeconds).toBe(5);
    expect(setts.node.blockLatencySeconds).toBe(60);
    expect(setts.node.refreshTransactions).toBe(true);
    expect(setts.node.compactBlocksHighBandwidth).toBe(true);
});
