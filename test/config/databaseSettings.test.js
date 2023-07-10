const databaseSettings = require('../../src/config/databaseSettings');
const network = require('../../src/config/network');
const primitives = require('../../src/primitives');

test('read default settings', () => {
    const settings = databaseSettings.getDefault(network.Network.mainnet);
    expect(settings.directory).toBe('blockchain');
    expect(settings.dbMode).toBe(primitives.DbMode.normal);
    expect(settings.reorgPoolLimit).toBe(100);
    // expect(settings.dbMaxSize).toBe(600 * 1024 * 1024 * 1024);
    expect(settings.dbMaxSize).toBe(200 * 1024 * 1024 * 1024);
    expect(settings.safeMode).toBe(true);
    expect(settings.cacheCapacity).toBe(0);
});
