// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

import { Network } from './network';

export interface Checkpoint {
    hash: Uint8Array;
    height: number;
}

export interface Authority {
    ip: string;
    port: number;
}

export interface Endpoint {
    scheme: string;
    host: string;
    port: number;
}

export interface NodeSettings {
    syncPeers: number;
    syncTimeoutSeconds: number;
    blockLatencySeconds: number;
    refreshTransactions: boolean;
    compactBlocksHighBandwidth: boolean;
}

export interface BlockchainSettings {
    cores: number;
    priority: boolean;
    byteFeeSatoshis: number;
    sigopFeeSatoshis: number;
    minimumOutputSatoshis: number;

    notifyLimitHours: number;
    reorganizationLimit: number;

    checkpoints: Array<Checkpoint>;

    fixCheckpoints: boolean;
    allowCollisions: boolean;
    easyBlocks: boolean;
    retarget: boolean;
    bip16: boolean;
    bip30: boolean;
    bip34: boolean;
    bip66: boolean;
    bip65: boolean;
    bip90: boolean;
    bip68: boolean;
    bip112: boolean;
    bip113: boolean;
    bchUahf: boolean;
    bchDaaCw144: boolean;
    bchPythagoras: boolean;
    bchEuclid: boolean;
    bchPisano: boolean;
    bchMersenne: boolean;
    bchFermat: boolean;
    bchEuler: boolean;
    bchGauss: boolean;
    bchDescartes: boolean;

    lobachevskiActivationTime: number;
    galoisActivationTime: number;

    asertHalfLife: number;
}

export interface DatabaseSettings {
    directory: string;
    dbMode: DbMode;
    reorgPoolLimit: number;
    dbMaxSize: number;
    safeMode: boolean;
    cacheCapacity: number;
}

export interface NetworkSettings {
    threads: number;

    protocolMaximum: number;
    protocolMinimum: number;
    services: number;
    invalidServices: number;

    relayTransactions: boolean;
    validateChecksum: boolean;

    identifier: number;
    inboundPort: number;
    inboundConnections: number;
    outboundConnections: number;
    manualAttemptLimit: number;
    connectBatchSize: number;
    connectTimeoutSeconds: number;
    channelHandshakeSeconds: number;
    channelHeartbeatMinutes: number;
    channelInactivityMinutes: number;
    channelExpirationMinutes: number;
    channelGerminationSeconds: number;
    hostPoolCapacity: number;

    hostsFile: string;

    self: Authority;
    blacklist: Array<Authority>;

    peers: Array<Endpoint>;
    seeds: Array<Endpoint>;

    debugFile: string;
    errorFile: string;
    archiveDirectory: string;

    rotationSize: number;
    minimumFreeSpace: number;
    maximumArchiveSize: number;
    maximumArchiveFiles: number;

    statisticsServer: Authority;

    verbose: boolean;
    useIpv6: boolean;

    userAgentBlacklist: Array<string>;
}

export interface Settings {
    node: NodeSettings;
    chain: BlockchainSettings;
    database: DatabaseSettings;
    network: NetworkSettings;
}

export interface SettingsResult {
    ok: boolean;
    message?: string;
    settings?: Settings;
}

export declare function getDefault(network : Network): Settings;

export declare function getFromFile(file : string): SettingsResult;
