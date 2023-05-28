// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('@knuth/bch-native');

const getDefault = (network) => {
    return kth.config_node_settings_default(network);
};

exports.getDefault = getDefault;
