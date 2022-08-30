// Copyright (c) 2016-2022 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

import { Chain } from './chain/chain';
import { Settings } from './config/settings';
import { StartModules } from './primitives';

export declare class Node {
  constructor(settings: Settings, stdoutEnabled: boolean);

  get chain(): undefined | Chain;

  close(): void;

  launch(mods: StartModules): Promise<number>;
}
