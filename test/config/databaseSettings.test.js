const databaseSettings = require('../../src/config/databaseSettings');
const network = require('../../src/config/network');

test('read default settings', () => {
    const settings = databaseSettings.getDefault(network.Network.mainnet);
    expect(settings.directory).toBe('blockchain');
    expect(settings.flushWrites).toBe(false);
    expect(settings.fileGrowthRate).toBe(50);
    expect(settings.indexStartHeight).toBe(0);
    expect(settings.reorgPoolLimit).toBe(100);
    expect(settings.dbMaxSize).toBe(600 * 1024 * 1024 * 1024);
    expect(settings.safeMode).toBe(true);
    expect(settings.cacheCapacity).toBe(0);
});
