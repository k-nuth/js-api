const nodeSettings = require('../../src/config/nodeSettings');
const network = require('../../src/config/network');

test('read default settings', () => {
    const settings = nodeSettings.getDefault(network.Network.mainnet);
    expect(settings.syncPeers).toBe(0);
    expect(settings.syncTimeoutSeconds).toBe(5);
    expect(settings.blockLatencySeconds).toBe(60);
    expect(settings.refreshTransactions).toBe(true);
    expect(settings.compactBlocksHighBandwidth).toBe(true);
});
