// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const kth = require('@knuth/bch-native');
const Promise = require('bluebird');
const header = require('./header');
const block = require('./block');
const transaction = require('./transaction');
const blockList = require('./blockList');

const async_chain = {
    // fetch_last_height: Promise.promisify(kth.chain_fetch_last_height),
    fetch_last_height: (...args) => {
        return new Promise((resolve) => {
            kth.chain_fetch_last_height(...args, (...handler_args) => {
                resolve(handler_args);
            });
        });
    },

    fetch_block_height: (...args) => {
        // return new Promise((resolve, reject) => {
        return new Promise((resolve) => {
            // kth.chain_fetch_block_height(...args, (err, h) => {
            //     // if (err) return reject(err)
            //     resolve([err, h]);
            // });
            kth.chain_fetch_block_height(...args, (...handler_args) => {
                resolve(handler_args);
            });
        });
    },

    // fetch_block_header_by_height: Promise.promisify(kth.chain_fetch_block_header_by_height, { multiArgs: true }),
    fetch_block_header_by_height: (...args) => {
        return new Promise((resolve) => {
            kth.chain_fetch_block_header_by_height(...args, (...handler_args) => {
                resolve(handler_args);
            });
        });
    },
    fetch_block_header_by_hash: (...args) => {
        return new Promise((resolve) => {
            kth.chain_fetch_block_header_by_hash(...args, (...handler_args) => {
                resolve(handler_args);
            });
        });
    },
    fetch_block_by_height: (...args) => {
        return new Promise((resolve) => {
            kth.chain_fetch_block_by_height(...args, (...handler_args) => {
                resolve(handler_args);
            });
        });
    },
    fetch_block_by_hash: (...args) => {
        return new Promise((resolve) => {
            kth.chain_fetch_block_by_hash(...args, (...handler_args) => {
                resolve(handler_args);
            });
        });
    },
    fetch_transaction: (...args) => {
        return new Promise((resolve) => {
            kth.chain_fetch_transaction(...args, (...handler_args) => {
                resolve(handler_args);
            });
        });
    },
    fetch_transaction_position: (...args) => {
        return new Promise((resolve) => {
            kth.chain_fetch_transaction_position(...args, (...handler_args) => {
                resolve(handler_args);
            });
        });
    },

    // Organizers
    //   organize_block: Promise.promisify(kth.chain_organize_block, {multiArgs: true}),
    organize_block: (...args) => {
        // return new Promise((resolve, reject) => {
        return new Promise((resolve) => {
            kth.chain_organize_block(...args, (err) => {
                // if (err) return reject(err)
                resolve(err);
            });
        });
    },

    // organize_transaction: Promise.promisify(kth.chain_organize_transaction, { multiArgs: true })
    organize_transaction: (...args) => {
        return new Promise((resolve) => {
            kth.chain_organize_transaction(...args, (err) => {
                resolve(err);
            });
        });
    },

    // Subscribers
    subscribe_blockchain: (...args) => {
        kth.chain_subscribe_blockchain(...args);
    },
};

class Chain {
    constructor(native, nodeNative) {
        this.native = native;
        this.nodeNative = nodeNative;
        this.blockchainSubscribers = [];
        this.blockAlreadySubscribed = false;
    }

    async getLastHeight() {
        const res = async_chain.fetch_last_height(this.native);
        return res;
    }

    async getBlockHeight(hash) {
        const res = async_chain.fetch_block_height(this.native, hash);
        return res;
    }

    async getBlockHeaderByHeight(height) {
        const res = await async_chain.fetch_block_header_by_height(this.native, height);
        return [res[0], header.fromNative(res[1]), res[2]];
    }

    async getBlockHeaderByHash(hash) {
        const res = await async_chain.fetch_block_header_by_hash(this.native, hash);
        return [res[0], header.fromNative(res[1]), res[2]];
    }

    async getBlockByHeight(height) {
        const res = await async_chain.fetch_block_by_height(this.native, height);
        return [res[0], block.fromNative(res[1]), res[2]];
    }

    async getBlockByHash(hash) {
        const res = await async_chain.fetch_block_by_hash(this.native, hash);
        return [res[0], block.fromNative(res[1]), res[2]];
    }

    async getTransaction(hash, requireConfirmed) {
        const res = await async_chain.fetch_transaction(this.native, hash, requireConfirmed);
        return [res[0], transaction.fromNative(res[1]), res[2], res[3]];
    }

    async getTransactionPosition(hash, requireConfirmed) {
        const res = await async_chain.fetch_transaction_position(this.native, hash, requireConfirmed);
        return [res[0], res[1], res[2]];
    }

    // Organizers
    async organizeBlock(block) {
        const res = await async_chain.organize_block(this.native, block.toNative());
        return res;
    }

    async organizeTransaction(transaction) {
        const res = await async_chain.organize_transaction(this.native, transaction.toNative());
        return res;
    }

    subscribeBlockchain(callback) {
        this.blockchainSubscribers.push(callback);
        if (this.blockAlreadySubscribed) {
            return;
        }
        this.blockAlreadySubscribed = true;

        async_chain.subscribe_blockchain(this.nodeNative, this.native, (error, height, incomingBlocks, outgoingBlocks) => {
            if (incomingBlocks !== null) {
                incomingBlocks = blockList.fromNative(incomingBlocks);
            } else {
                incomingBlocks = [];
            }
            if (outgoingBlocks !== null) {
                outgoingBlocks = blockList.fromNative(outgoingBlocks);
            } else {
                outgoingBlocks = [];
            }

            for (const subscriber of [...this.blockchainSubscribers]) {
                if ( ! subscriber(error, height, incomingBlocks, outgoingBlocks)) {
                    this.blockchainSubscribers = this.blockchainSubscribers.filter(s => s !== subscriber);
                }
            }
            return true;
        });
    }

    //TODO(fernando): Merkle Block
    //TODO(fernando): Compact Block
    //TODO(fernando): Spend Block
    //TODO(fernando): History Block
}

exports.Chain = Chain;

// ---------------------------------------------------------------------------------------------
// C# ------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------

//     private void GetBlockHeight(byte[] blockHash, Action<ErrorCode, UInt64> handler) {
//         var managedHash = new hash_t
//         {
//             hash = blockHash
//         };
//         IntPtr contextPtr = CreateContext(handler, managedHash);
//         ChainNative.kth_chain_async_block_height(nativeInstance_, contextPtr, managedHash, internalGetBlockHeightHandler_);
//     }

//     /// <summary>
//     /// Gets the height of the highest block in the local copy of the blockchain, asynchronously.
//     /// </summary>
//     public async Task<ApiCallResult<UInt64>> GetLastHeightAsync() {
//         return await TaskHelper.ToTask<ApiCallResult<UInt64>>(tcs => {
//             GetLastHeight((code, height) => {
//                 tcs.TrySetResult(new ApiCallResult<UInt64> {
//                     ErrorCode = code,
//                     Result = height
//                 });
//             });
//         });
//     }

//     private void GetLastHeight(Action<ErrorCode, UInt64> handler) {
//         GCHandle handlerHandle = GCHandle.Alloc(handler);
//         IntPtr handlerPtr = (IntPtr)handlerHandle;
//         ChainNative.kth_chain_async_last_height(nativeInstance_, handlerPtr, internalGetLastHeightHandler_);
//     }

//     #endregion //Chain

//     #region Block

//     /// <summary>
//     /// Given a block hash, retrieve the full block it identifies, asynchronously.
//     /// </summary>
//     /// <param name="blockHash"> 32 bytes of the block hash </param>
//     public async Task<DisposableApiCallResult<GetBlockDataResult<IBlock>>> GetBlockByHashAsync(byte[] blockHash) {
//         return await TaskHelper.ToTask<DisposableApiCallResult<GetBlockDataResult<IBlock>>>(tcs => {
//             GetBlockByHash(blockHash, (code, block, height) => {
//                 tcs.TrySetResult(new DisposableApiCallResult<GetBlockDataResult<IBlock>> {
//                     ErrorCode = code,
//                     Result = new GetBlockDataResult<IBlock>
//                     {
//                         BlockData = block,
//                         BlockHeight = height
//                     }
//                 });
//             });
//         });
//     }

//     private void GetBlockByHash(byte[] blockHash, Action<ErrorCode, Block, UInt64> handler) {
//         var managedHash = new hash_t
//         {
//             hash = blockHash
//         };
//         IntPtr contextPtr = CreateContext(handler, managedHash);
//         ChainNative.kth_chain_async_block_by_hash(nativeInstance_, contextPtr, managedHash, internalGetBlockHandlerByHash_);
//     }

//     /// <summary>
//     /// Given a block height, retrieve the full block it identifies, asynchronously.
//     /// </summary>
//     /// <param name="height"> Block height </param>
//     public async Task<DisposableApiCallResult<GetBlockDataResult<IBlock>>> GetBlockByHeightAsync(UInt64 height) {
//         return await TaskHelper.ToTask<DisposableApiCallResult<GetBlockDataResult<IBlock>>>(tcs => {
//             GetBlockByHeight(height, (code, block, blockHeight) => {
//                 tcs.TrySetResult(new DisposableApiCallResult<GetBlockDataResult<IBlock>> {
//                     ErrorCode = code,
//                     Result = new GetBlockDataResult<IBlock>
//                     {
//                         BlockData = block,
//                         BlockHeight = blockHeight
//                     }
//                 });

//             });

//         });

//     }

//     private void GetBlockByHeight(UInt64 height, Action<ErrorCode, Block, UInt64> handler) {
//         GCHandle handlerHandle = GCHandle.Alloc(handler);
//         IntPtr handlerPtr = (IntPtr)handlerHandle;
//         ChainNative.kth_chain_async_block_by_height(nativeInstance_, handlerPtr, height, internalGetBlockHandler_);
//     }

//     /// <summary>
//     /// Given a block hash, retrieve block header, tx hashes and serialized block size, asynchronously.
//     /// </summary>
//     /// <param name="blockHash"> 32 bytes of the block hash </param>
//     public async Task<DisposableApiCallResult<GetBlockHeaderByHashTxSizeResult>> GetBlockHeaderByHashTxSizesAsync(byte[] blockHash) {
//         return await TaskHelper.ToTask<DisposableApiCallResult<GetBlockHeaderByHashTxSizeResult>>(tcs => {

//             GetBlockHeaderByHashTxSizes(blockHash, (errorCode, header, height, hashes, size) => {
//                 tcs.TrySetResult(new DisposableApiCallResult<GetBlockHeaderByHashTxSizeResult> {
//                     ErrorCode = errorCode,
//                     Result = new GetBlockHeaderByHashTxSizeResult {
//                         Header = new GetBlockDataResult<IHeader> { BlockData = header, BlockHeight = height },
//                         TransactionHashes = hashes,
//                         SerializedBlockSize = size
//                     }
//                 });

//             });

//         });
//     }

//     private void GetBlockHeaderByHashTxSizes(byte[] blockHash, GetBlockHeaderByHashTxsSizeHandler handler) {
//         var managedHash = new hash_t
//         {
//             hash = blockHash
//         };
//         IntPtr contextPtr = CreateContext(handler, managedHash);
//         ChainNative.kth_chain_async_block_header_by_hash_txs_size(nativeInstance_, contextPtr, managedHash, internalGetBlockHeaderByHashTxsSizeHandler_);
//     }

//     /// <summary>
//     /// Given a block height, retrieve only block hash and timestamp, asynchronously.
//     /// </summary>
//     /// <param name="height"> Block height </param>
//     public async Task<ApiCallResult<GetBlockHashTimestampResult>> GetBlockByHeightHashTimestampAsync(UInt64 height) {
//         return await TaskHelper.ToTask<ApiCallResult<GetBlockHashTimestampResult>>(tcs => {
//             GetBlockByHeightHashTimestamp(height, (errorCode, hash, date, blockHeight) => {
//                 tcs.TrySetResult(new ApiCallResult<GetBlockHashTimestampResult> {
//                     ErrorCode = errorCode,
//                     Result = new GetBlockHashTimestampResult
//                     {
//                         BlockHash = hash,
//                         BlockTimestamp = date
//                     }
//                 });

//             });
//         });
//     }

//     private void GetBlockByHeightHashTimestamp(UInt64 height, GetBlockByHeightHashTimestampHandler handler) {
//         GCHandle handlerHandle = GCHandle.Alloc(handler);
//         IntPtr handlerPtr = (IntPtr)handlerHandle;
//         ChainNative.kth_chain_async_block_by_height_timestamp(nativeInstance_, handlerPtr, height, internalGetBlockHeightTimestampHandler_);
//     }

//     #endregion //Block

//     #region Block header

//     /// <summary>
//     /// Given a block hash, get the header from the block it identifies, asynchronously.
//     /// </summary>
//     /// <param name="blockHash"> 32 bytes of the block hash </param>
//     public async Task<DisposableApiCallResult<GetBlockDataResult<IHeader>>> GetBlockHeaderByHashAsync(byte[] blockHash) {
//         return await TaskHelper.ToTask<DisposableApiCallResult<GetBlockDataResult<IHeader>>>(tcs => {
//             GetBlockHeaderByHash(blockHash, (code, header, height) => {
//                 tcs.TrySetResult(new DisposableApiCallResult<GetBlockDataResult<IHeader>> {
//                     ErrorCode = code,
//                     Result = new GetBlockDataResult<IHeader>
//                     {
//                         BlockData = header,
//                         BlockHeight = height
//                     }
//                 });

//             });
//         });
//     }

//     private void GetBlockHeaderByHash(byte[] blockHash, Action<ErrorCode, Header, UInt64> handler) {
//         var managedHash = new hash_t
//         {
//             hash = blockHash
//         };
//         IntPtr contextPtr = CreateContext(handler, managedHash);
//         ChainNative.kth_chain_async_block_header_by_hash(nativeInstance_, contextPtr, managedHash, internalGetBlockHeaderHandlerByHash_);
//     }

//     /// <summary>
//     /// Given a block height, get the header from the block it identifies, asynchronously.
//     /// </summary>
//     /// <param name="height"> Block height </param>
//     public async Task<DisposableApiCallResult<GetBlockDataResult<IHeader>>> GetBlockHeaderByHeightAsync(UInt64 height) {
//         return await TaskHelper.ToTask<DisposableApiCallResult<GetBlockDataResult<IHeader>>>(tcs => {
//             GetBlockHeaderByHeight(height, (code, header, blockHeight) => {
//                 tcs.TrySetResult(new DisposableApiCallResult<GetBlockDataResult<IHeader>> {
//                     ErrorCode = code,
//                     Result = new GetBlockDataResult<IHeader>
//                     {
//                         BlockData = header,
//                         BlockHeight = blockHeight
//                     }
//                 });
//             });
//         });
//     }

//     private void GetBlockHeaderByHeight(UInt64 height, Action<ErrorCode, Header, UInt64> handler) {
//         GCHandle handlerHandle = GCHandle.Alloc(handler);
//         IntPtr handlerPtr = (IntPtr)handlerHandle;
//         ChainNative.kth_chain_async_block_header_by_height(nativeInstance_, handlerPtr, height, internalGetBlockHeaderHandler_);
//     }

//     #endregion //Block header

//     #region Merkle Block

//     /// <summary>
//     /// Given a block hash, get the merkle block from the block it identifies, asynchronously.
//     /// </summary>
//     /// <param name="blockHash"> 32 bytes of the block hash </param>
//     public async Task<DisposableApiCallResult<GetBlockDataResult<IMerkleBlock>>> GetMerkleBlockByHashAsync(byte[] blockHash) {
//         return await TaskHelper.ToTask<DisposableApiCallResult<GetBlockDataResult<IMerkleBlock>>>(tcs => {
//             GetMerkleBlockByHash(blockHash, (code, merkleBlock, height) => {
//                 tcs.SetResult(new DisposableApiCallResult<GetBlockDataResult<IMerkleBlock>> {
//                     ErrorCode = code,
//                     Result = new GetBlockDataResult<IMerkleBlock>
//                     {
//                         BlockData = merkleBlock,
//                         BlockHeight = height
//                     }
//                 });
//             });

//         });
//     }

//     private void GetMerkleBlockByHash(byte[] blockHash, Action<ErrorCode, MerkleBlock, UInt64> handler) {
//         var managedHash = new hash_t
//         {
//             hash = blockHash
//         };
//         IntPtr contextPtr = CreateContext(handler, managedHash);
//         ChainNative.kth_chain_async_merkle_block_by_hash(nativeInstance_, contextPtr, managedHash, internalMerkleBlockGetHandlerByHash_);
//     }

//     /// <summary>
//     /// Given a block height, get the merkle block from the block it identifies, asynchronously.
//     /// </summary>
//     /// <param name="height"> Desired block height </param>
//     public async Task<DisposableApiCallResult<GetBlockDataResult<IMerkleBlock>>> GetMerkleBlockByHeightAsync(UInt64 height) {
//         return await TaskHelper.ToTask<DisposableApiCallResult<GetBlockDataResult<IMerkleBlock>>>(tcs => {
//             GetMerkleBlockByHeight(height, (code, merkleBlock, actualHeight) => {
//                 tcs.TrySetResult(new DisposableApiCallResult<GetBlockDataResult<IMerkleBlock>> {
//                     ErrorCode = code,
//                     Result = new GetBlockDataResult<IMerkleBlock>
//                     {
//                         BlockData = merkleBlock,
//                         BlockHeight = actualHeight
//                     }
//                 });

//             });

//         });
//     }

//     private void GetMerkleBlockByHeight(UInt64 height, Action<ErrorCode, MerkleBlock, UInt64> handler) {
//         GCHandle handlerHandle = GCHandle.Alloc(handler);
//         IntPtr handlerPtr = (IntPtr)handlerHandle;
//         ChainNative.kth_chain_async_merkle_block_by_height(nativeInstance_, handlerPtr, height, internalMerkleBlockGetHandler_);
//     }

//     #endregion //Merkle Block

//     #region Compact block
//     /*
//     /// <summary>
//     /// Given a block hash, get the compact block from the block it identifies, asynchronously.
//     /// </summary>
//     /// <param name="blockHash"> 32 bytes of the block hash </param>
//     public async Task<DisposableApiCallResult<GetBlockDataResult<CompactBlock>>> GetCompactBlockByHashAsync(byte[] blockHash) {
//         return await TaskHelper.ToTask<DisposableApiCallResult<GetBlockDataResult<CompactBlock>>>(tcs => {
//             GetCompactBlockByHash(blockHash, (code, compactBlock, height) => {
//                 tcs.TrySetResult(new DisposableApiCallResult<GetBlockDataResult<CompactBlock>> {
//                     ErrorCode = code,
//                     Result = new GetBlockDataResult<CompactBlock>
//                     {
//                         BlockData = compactBlock,
//                         BlockHeight = height
//                     }
//                 });

//             });

//         });
//     }

//     /// <summary>
//     /// Given a block hash, get the compact block from the block it identifies, asynchronously.
//     /// </summary>
//     /// <param name="blockHash"> 32 bytes of the block hash </param>
//     /// <param name="handler"> Callback which will be invoked when the compact block is retrieved </param>
//     private void GetCompactBlockByHash(byte[] blockHash, Action<ErrorCode, CompactBlock, UInt64> handler) {
//         var managedHash = new hash_t
//         {
//             hash = blockHash
//         };
//         IntPtr contextPtr = CreateContext(handler, managedHash);
//         ChainNative.kth_chain_async_compact_block_by_hash(nativeInstance_, contextPtr, managedHash, internalGetCompactBlockHandler_);
//     }*/

//     /*
//     /// <summary>
//     /// Given a block height, get the compact block from the block it identifies, asynchronously.
//     /// </summary>
//     /// <param name="height"> Desired block height </param>
//     public async Task<DisposableApiCallResult<GetBlockDataResult<CompactBlock>>> GetCompactBlockByHeightAsync(UInt64 height) {
//         return await TaskHelper.ToTask<DisposableApiCallResult<GetBlockDataResult<CompactBlock>>>(tcs => {
//             GetCompactBlockByHeight(height, (code, compactBlock, blockHeight) => {
//                 tcs.TrySetResult(new DisposableApiCallResult<GetBlockDataResult<CompactBlock>> {
//                     ErrorCode = code,
//                     Result = new GetBlockDataResult<CompactBlock>
//                     {
//                         BlockData = compactBlock,
//                         BlockHeight = blockHeight
//                     }
//                 });

//             });

//         });
//     }

//     /// <summary>
//     /// Given a block height, get the compact block from the block it identifies, asynchronously.
//     /// </summary>
//     /// <param name="height"> Desired block height </param>
//     /// <param name="handler"> Callback which will be invoked when the compact block is retrieved </param>
//     private void GetCompactBlockByHeight(UInt64 height, Action<ErrorCode, CompactBlock, UInt64> handler) {
//         GCHandle handlerHandle = GCHandle.Alloc(handler);
//         IntPtr handlerPtr = (IntPtr)handlerHandle;
//         ChainNative.kth_chain_async_compact_block_by_height(nativeInstance_, handlerPtr, height, internalGetCompactBlockHandler_);
//     }
//     */

//     #endregion //Compact block

//     #region Transaction

//     /// <summary>
//     /// Get a transaction by its hash, asynchronously.
//     /// </summary>
//     /// <param name="txHash"> 32 bytes of transaction hash </param>
//     /// <param name="requireConfirmed"> True if the transaction must belong to a block </param>
//     public async Task<DisposableApiCallResult<GetTxDataResult>> GetTransactionAsync(byte[] txHash, bool requireConfirmed) {
//         return await TaskHelper.ToTask<DisposableApiCallResult<GetTxDataResult>>(tcs => {
//             GetTransaction(txHash, requireConfirmed, (code, transaction, index, height) => {
//                 tcs.TrySetResult(new DisposableApiCallResult<GetTxDataResult> {
//                     ErrorCode = code,
//                     Result = new GetTxDataResult {
//                         Tx = transaction,
//                         TxPosition = new GetTxPositionResult {Index = index, BlockHeight = height }
//                     }
//                 });
//             });
//         });
//     }

//     private void GetTransaction(byte[] txHash, bool requireConfirmed, Action<ErrorCode, Transaction, UInt64, UInt64> handler) {
//         var managedHash = new hash_t { hash = txHash };
//         IntPtr contextPtr = CreateContext(handler, managedHash);
//         ChainNative.kth_chain_async_transaction(nativeInstance_, contextPtr, managedHash, Helper.BoolToC(requireConfirmed), internalGetTransactionHandler_);
//     }

//     /// <summary>
//     /// Given a transaction hash, it fetches the height and position inside the block, asynchronously.
//     /// </summary>
//     /// <param name="txHash"> 32 bytes of transaction hash </param>
//     /// <param name="requireConfirmed"> True iif the transaction must belong to a block </param>
//     public async Task<ApiCallResult<GetTxPositionResult>> GetTransactionPositionAsync(byte[] txHash, bool requireConfirmed) {
//         return await TaskHelper.ToTask<ApiCallResult<GetTxPositionResult>>(tcs => {

//             GetTransactionPosition(txHash, requireConfirmed, (code, index, height) => {
//                 tcs.TrySetResult(new ApiCallResult<GetTxPositionResult> {
//                     ErrorCode = code,
//                     Result = new GetTxPositionResult { Index = index, BlockHeight = height }
//                 });

//             });

//         });
//     }

//     private void GetTransactionPosition(byte[] txHash, bool requireConfirmed, Action<ErrorCode, UInt64, UInt64> handler) {
//         var managedHash = new hash_t
//         {
//             hash = txHash
//         };
//         IntPtr contextPtr = CreateContext(handler, managedHash);
//         ChainNative.kth_chain_async_transaction_position(nativeInstance_, contextPtr, managedHash, Helper.BoolToC(requireConfirmed), internalGetTransactionPositionHandler_);
//     }

//     #endregion //Transaction

//     #region Spend

//     /// <summary>
//     /// Get the transaction input which spends the indicated output, asynchronously.
//     /// </summary>
//     /// <param name="outputPoint"> Tx hash and index pair where the output was spent. </param>
//     public async Task<ApiCallResult<IPoint>> GetSpendAsync(OutputPoint outputPoint) {
//         return await TaskHelper.ToTask<ApiCallResult<IPoint>>(tcs => {
//             GetSpend(outputPoint, (code, point) => {
//                 tcs.TrySetResult(new ApiCallResult<IPoint> { ErrorCode = code, Result = point });
//             });
//         });
//     }

//     private void GetSpend(OutputPoint outputPoint, Action<ErrorCode, Point> handler) {
//         IntPtr contextPtr = CreateContext(handler, outputPoint);
//         ChainNative.kth_chain_async_spend(nativeInstance_, contextPtr, outputPoint.NativeInstance, internalGetSpendHandler_);
//     }

//     #endregion //Spend

//     #region History

//     /// <summary>
//     /// Get a list of output points, values, and spends for a given payment address (asynchronously)
//     /// </summary>
//     /// <param name="address"> Bitcoin payment address to search </param>
//     /// <param name="limit"> Maximum amount of results to fetch </param>
//     /// <param name="fromHeight"> Starting point to search for transactions </param>
//     public async Task<DisposableApiCallResult<INativeList<IHistoryCompact>>> GetHistoryAsync(PaymentAddress address, UInt64 limit, UInt64 fromHeight) {
//         return await TaskHelper.ToTask<DisposableApiCallResult<INativeList<IHistoryCompact>>>(tcs => {
//             GetHistory(address, limit, fromHeight, (code, history) => {
//                 tcs.TrySetResult(new DisposableApiCallResult<INativeList<IHistoryCompact>> {
//                     ErrorCode = code,
//                     Result = history
//                 });

//             });
//         });
//     }

//     private void GetHistory(PaymentAddress address, UInt64 limit, UInt64 fromHeight, Action<ErrorCode, HistoryCompactList> handler) {
//         GCHandle handlerHandle = GCHandle.Alloc(handler);
//         IntPtr handlerPtr = (IntPtr)handlerHandle;
//         ChainNative.kth_chain_async_history(nativeInstance_, handlerPtr, address.NativeInstance, limit, fromHeight, internalGetHistoryHandler_);
//     }

//     /// <summary>
//     /// Get a list of tx ids for a given payment address (asynchronously). Duplicates are already filtered out.
//     /// </summary>
//     /// <param name="address"> Bitcoin payment address to search </param>
//     /// <param name="limit"> Maximum amount of results to fetch </param>
//     /// <param name="fromHeight"> Starting point to search for transactions </param>
//     public async Task<DisposableApiCallResult<INativeList<byte[]>>> GetConfirmedTransactionsAsync(PaymentAddress address, UInt64 limit, UInt64 fromHeight) {
//         return await TaskHelper.ToTask<DisposableApiCallResult<INativeList<byte[]>>>(tcs => {
//             GetConfirmedTransactions(address, limit, fromHeight, (code, txns) => {
//                 tcs.TrySetResult(new DisposableApiCallResult<INativeList<byte[]>> {
//                     ErrorCode = code,
//                     Result = txns
//                 });
//             });
//         });
//     }

//     private void GetConfirmedTransactions(PaymentAddress address, UInt64 limit, UInt64 fromHeight, Action<ErrorCode, HashList> handler) {
//         GCHandle handlerHandle = GCHandle.Alloc(handler);
//         IntPtr handlerPtr = (IntPtr)handlerHandle;
//         ChainNative.kth_chain_async_confirmed_transactions(nativeInstance_, handlerPtr, address.NativeInstance, limit, fromHeight, internalGetTxnsHandler_);
//     }

//     #endregion //History

//     #region Stealth

//     /// <summary>
//     /// Get metadata on potential payment transactions by stealth filter. Given a filter and a
//     /// height in the chain, it queries the chain for transactions matching the given filter.
//     /// </summary>
//     /// <param name="filter"> Must be at least 8 bits in length. example "10101010" </param>
//     /// <param name="fromHeight"> Starting height in the chain to search for transactions </param>
//     /* public async Task<DisposableApiCallResult<INativeList<IStealthCompact>>> GetStealthAsync(Binary filter, UInt64 fromHeight) {
//         return await TaskHelper.ToTask<DisposableApiCallResult<INativeList<IStealthCompact>>>(tcs => {

//             GetStealth(filter, fromHeight, (code, list) => {
//                 tcs.TrySetResult(new DisposableApiCallResult<INativeList<IStealthCompact>>()
//                 {
//                     ErrorCode = code,
//                     Result = list
//                 });

//             });

//         });
//     }*/

//     private void GetStealth(Binary filter, UInt64 fromHeight, Action<ErrorCode, StealthCompactList> handler) {
//         IntPtr contextPtr = CreateContext(handler, filter);
//         ChainNative.kth_chain_async_stealth(nativeInstance_, contextPtr, filter.NativeInstance, fromHeight, internalGetStealthHandler_);
//     }

//     #endregion //Stealth

//     #region Block indexes

//     /*/// <summary>
//     /// Given a list of indexes, fetch a header reader for them, asynchronously
//     /// </summary>
//     /// <param name="indexes"> Block indexes </param>
//     public async Task<DisposableApiCallResult<HeaderReader>> GetBlockLocatorAsync(BlockIndexList indexes) {
//         return await TaskHelper.ToTask<DisposableApiCallResult<HeaderReader>>(tcs => {
//             GetBlockLocator(indexes, (code, headerReader) => {
//                 tcs.TrySetResult(new DisposableApiCallResult<HeaderReader> {
//                     ErrorCode = code,
//                     Result = headerReader
//                 });

//             });

//         });
//     }*/

//    /* /// <summary>
//     /// Given a list of indexes, fetch a header reader for them, asynchronously
//     /// </summary>
//     /// <param name="indexes"> Block indexes </param>
//     /// <param name="handler"> Callback which will called when the reader is retrieved </param>
//     private void GetBlockLocator(BlockIndexList indexes, Action<ErrorCode, HeaderReader> handler) {
//         GCHandle handlerHandle = GCHandle.Alloc(handler);
//         IntPtr handlerPtr = (IntPtr)handlerHandle;
//         ChainNative.kth_chain_async_block_locator(nativeInstance_, handlerPtr, indexes.NativeInstance, internalBlockLocatorGetHandler_);
//     }*/

//     #endregion //Block indexes

//     #region Organizers

//     /// <summary>
//     /// Given a block, organize it (async).
//     /// </summary>
//     /// <param name="block"> The block to organize </param>
//     public async Task<ErrorCode> OrganizeBlockAsync(Block block) {
//         return await TaskHelper.ToTask<ErrorCode>(tcs => {
//             OrganizeBlock(block, errorCode => {
//                 tcs.TrySetResult(errorCode);
//             });

//         });
//     }

//     private void OrganizeBlock(Block block, Action<ErrorCode> handler) {
//         GCHandle handlerHandle = GCHandle.Alloc(handler);
//         IntPtr handlerPtr = (IntPtr)handlerHandle;
//         ChainNative.kth_chain_async_organize_block(nativeInstance_, handlerPtr, block.NativeInstance, internalResultHandler_);
//     }

//     /// <summary>
//     /// Given a transaction, organize it (async).
//     /// </summary>
//     /// <param name="transaction"> The transaction to organize. </param>
//     public async Task<ErrorCode> OrganizeTransactionAsync(Transaction transaction) {
//         return await TaskHelper.ToTask<ErrorCode>(tcs => {
//             OrganizeTransaction(transaction, errorCode => {
//                 tcs.TrySetResult(errorCode);
//             });
//         });
//     }

//     private void OrganizeTransaction(Transaction transaction, Action<ErrorCode> handler) {
//         GCHandle handlerHandle = GCHandle.Alloc(handler);
//         IntPtr handlerPtr = (IntPtr)handlerHandle;
//         ChainNative.kth_chain_async_organize_transaction(nativeInstance_, handlerPtr, transaction.NativeInstance, internalResultHandler_);
//     }

//     #endregion //Organizers

//     #region Misc

//     /// <summary>
//     /// Determine if a transaction is valid for submission to the blockchain.
//     /// </summary>
//     /// <param name="transaction"> Transaction to validate </param>
//     public async Task<ApiCallResult<string>> ValidateTransactionAsync(Transaction transaction) {
//         return await TaskHelper.ToTask<ApiCallResult<string>>(tcs => {

//             ValidateTransaction(transaction, (code, message) => {
//                 tcs.TrySetResult(new ApiCallResult<string> {
//                     ErrorCode = code,
//                     Result = message
//                 });

//             });

//         });
//     }

//     private void ValidateTransaction(Transaction transaction, Action<ErrorCode, string> handler) {
//         GCHandle handlerHandle = GCHandle.Alloc(handler);
//         IntPtr handlerPtr = (IntPtr)handlerHandle;
//         ChainNative.kth_chain_transaction_validate(nativeInstance_, handlerPtr, transaction.NativeInstance, internalValidateTxHandler_);
//     }

//     /// <summary>
//     /// Determine if the node is synchronized (i.e. has the latest copy of the blockchain/is at top height)
//     /// </summary>
//     public bool IsStale {
//         get { return ChainNative.kth_chain_is_stale(nativeInstance_) != 0; }
//     }

//     #endregion //Misc

//     #region Mempool

//     public INativeList<ITransaction> GetMempoolTransactions(INativeList<PaymentAddress> addresses, bool useTestnetRules) {
//         IntPtr txs = ChainNative.kth_chain_sync_mempool_transactions_from_wallets
//         (
//             nativeInstance_,
//             addresses.NativeInstance,
//             useTestnetRules? 1 : 0
//         );
//         return new TransactionList(txs);
//     }

//     #endregion //Mempool

//     private IntPtr CreateContext<TC, TP>(TC callback, TP parameters) {
//         // Both the callback and its parameters need to hold garbage collection off until
//         // the callback is called, so a GCHandle is taken for an object containing both of them:
//         // that is the context
//         var context = new Tuple<TC, TP>(callback, parameters);
//         var contextHandle = GCHandle.Alloc(context);
//         return (IntPtr)contextHandle;
//     }

//     private static void GetBlockByHashInternalHandler(IntPtr chain, IntPtr contextPtr, ErrorCode error, IntPtr block, UInt64 height) {
//         GCHandle contextHandle = (GCHandle)contextPtr;
//         try
//         {
//             var context = (contextHandle.Target as Tuple<Action<ErrorCode, Block, UInt64>, hash_t>);
//             Action<ErrorCode, Block, UInt64> handler = context.Item1;
//             handler(error, new Block(block), height);
//         }
//         finally
//         {
//             contextHandle.Free();
//         }
//     }

//     private static void GetBlockInternalHandler(IntPtr chain, IntPtr context, ErrorCode error, IntPtr block, UInt64 height) {
//         GCHandle handlerHandle = (GCHandle)context;
//         try
//         {
//             Action<ErrorCode, Block, UInt64> handler = (handlerHandle.Target as Action<ErrorCode, Block, UInt64>);
//             handler(error, new Block(block), height);
//         }
//         finally
//         {
//             handlerHandle.Free();
//         }
//     }

//     private static void GetBlockHeaderByHashTxsSizeInternalHandler(IntPtr chain, IntPtr contextPtr, ErrorCode error, IntPtr blockHeader, UInt64 blockHeight, IntPtr txHashes, UInt64 blockSerializedSize) {
//         var contextHandle = (GCHandle)contextPtr;
//         try
//         {
//             var context = contextHandle.Target as Tuple<GetBlockHeaderByHashTxsSizeHandler, hash_t>;
//             GetBlockHeaderByHashTxsSizeHandler handler = context.Item1;
//             handler(error, new Header(blockHeader), blockHeight, new HashList(txHashes), blockSerializedSize);
//         }
//         finally
//         {
//             contextHandle.Free();
//         }
//     }

//     private static void GetBlockByHeightHashTimestampInternalHandler(IntPtr chain, IntPtr context, ErrorCode error, hash_t blockHash, UInt32 timestamp, UInt64 height) {
//         GCHandle handlerHandle = (GCHandle)context;
//         try
//         {
//             var handler = (handlerHandle.Target as GetBlockByHeightHashTimestampHandler);
//             //Copy native memory before it goes out of scope
//             byte[] blockHashCopy = new byte[blockHash.hash.Length];
//             blockHash.hash.CopyTo(blockHashCopy, 0);
//             //Convert Unix timestamp to date
//             DateTime blockDate = DateTimeOffset.FromUnixTimeSeconds(timestamp).UtcDateTime;
//             handler(error, blockHashCopy, blockDate, height);
//         }
//         finally
//         {
//             handlerHandle.Free();
//         }
//     }

//     private static void GetBlockHeaderByHashInternalHandler(IntPtr chain, IntPtr contextPtr, ErrorCode error,
//         IntPtr header, UInt64 height) {
//         var contextHandle = (GCHandle)contextPtr;
//         try
//         {
//             var context = contextHandle.Target as Tuple<Action<ErrorCode, Header, UInt64>, hash_t>;
//             Action<ErrorCode, Header, UInt64> handler = context.Item1;
//             handler(error, new Header(header), height);
//         }
//         finally
//         {
//             contextHandle.Free();
//         }
//     }

//     private static void GetBlockHeaderInternalHandler(IntPtr chain, IntPtr context, ErrorCode error, IntPtr header, UInt64 height) {
//         var handlerHandle = (GCHandle)context;
//         try
//         {
//             var handler = (handlerHandle.Target as Action<ErrorCode, Header, UInt64>);
//             handler(error, new Header(header), height);
//         }
//         finally
//         {
//             handlerHandle.Free();
//         }
//     }

//     private static void GetBlockHeightInternalHandler(IntPtr chain, IntPtr contextPtr, ErrorCode error, UInt64 height) {
//         var contextHandle = (GCHandle)contextPtr;
//         try
//         {
//             var context = (contextHandle.Target as Tuple<Action<ErrorCode, UInt64>, hash_t>);
//             Action<ErrorCode, UInt64> handler = context.Item1;
//             handler(error, height);
//         }
//         finally
//         {
//             contextHandle.Free();
//         }
//     }
//     /*
//     private static void GetBlockLocatorInternalHandler(IntPtr chain, IntPtr context, ErrorCode error, IntPtr headerReader) {
//         GCHandle handlerHandle = (GCHandle)context;
//         try
//         {
//             var handler = (handlerHandle.Target as Action<ErrorCode, HeaderReader>);
//             handler(error, new HeaderReader(headerReader));
//         }
//         finally
//         {
//             handlerHandle.Free();
//         }
//     }*/
//     /*
//     private static void GetCompactBlockInternalHandler(IntPtr chain, IntPtr context, ErrorCode error, IntPtr compactBlock, UInt64 height) {
//         GCHandle handlerHandle = (GCHandle)context;
//         try
//         {
//             var contexHandler = handlerHandle.Target as Tuple<Action<ErrorCode, CompactBlock, UInt64>,hash_t>;
//             Action<ErrorCode, CompactBlock, UInt64> handler = contexHandler.Item1;
//             handler(error, new CompactBlock(compactBlock), height);
//         }
//         finally
//         {
//             handlerHandle.Free();
//         }
//     }*/

//     private static void GetHistoryInternalHandler(IntPtr chain, IntPtr context, ErrorCode error, IntPtr history) {
//         GCHandle handlerHandle = (GCHandle)context;
//         try
//         {
//             var handler = (handlerHandle.Target as Action<ErrorCode, HistoryCompactList>);
//             handler(error, new HistoryCompactList(history));
//         }
//         finally
//         {
//             handlerHandle.Free();
//         }
//     }

//     private static void GetTransactionsInternalHandler(IntPtr chain, IntPtr context, ErrorCode error, IntPtr txns) {
//         GCHandle handlerHandle = (GCHandle)context;
//         try
//         {
//             var handler = (handlerHandle.Target as Action<ErrorCode, HashList>);
//             handler(error, new HashList(txns));
//         }
//         finally
//         {
//             handlerHandle.Free();
//         }
//     }

//     private static void GetLastHeightInternalHandler(IntPtr chain, IntPtr context, ErrorCode error, UInt64 height) {
//         GCHandle handlerHandle = (GCHandle)context;
//         try
//         {
//             var handler = (handlerHandle.Target as Action<ErrorCode, UInt64>);
//             handler(error, height);
//         }
//         finally
//         {
//             handlerHandle.Free();
//         }
//     }

//     private static void GetMerkleBlockByHashInternalHandler(IntPtr chain, IntPtr contextPtr, ErrorCode error,
//         IntPtr merkleBlock, UInt64 height) {
//         GCHandle contextHandle = (GCHandle)contextPtr;
//         try
//         {
//             var context = (contextHandle.Target as Tuple<Action<ErrorCode, MerkleBlock, UInt64>, hash_t>);
//             Action<ErrorCode, MerkleBlock, UInt64> handler = context.Item1;
//             handler(error, new MerkleBlock(merkleBlock), height);
//         }
//         finally
//         {
//             contextHandle.Free();
//         }
//     }

//     private static void GetMerkleBlockInternalHandler(IntPtr chain, IntPtr context, ErrorCode error, IntPtr merkleBlock, UInt64 height) {
//         GCHandle handlerHandle = (GCHandle)context;
//         try
//         {
//             var handler = handlerHandle.Target as Action<ErrorCode, MerkleBlock, UInt64>;
//             handler(error, new MerkleBlock(merkleBlock), height);
//         }
//         finally
//         {
//             handlerHandle.Free();
//         }
//     }

//     private static void GetSpendInternalHandler(IntPtr chain, IntPtr contextPtr, ErrorCode error, IntPtr inputPoint) {
//         GCHandle contextHandle = (GCHandle)contextPtr;
//         try
//         {
//             var context = (contextHandle.Target as Tuple<Action<ErrorCode, Point>, OutputPoint>);
//             Action<ErrorCode, Point> handler = context.Item1;
//             handler(error, new Point(inputPoint));
//         }
//         finally
//         {
//             contextHandle.Free();
//         }
//     }

//     private static void GetStealthInternalHandler(IntPtr chain, IntPtr contextPtr, ErrorCode error, IntPtr stealth) {
//         GCHandle contextHandle = (GCHandle)contextPtr;
//         try
//         {
//             var context = (contextHandle.Target as Tuple<Action<ErrorCode, StealthCompactList>, Binary>);
//             Action<ErrorCode, StealthCompactList> handler = context.Item1;
//             handler(error, new StealthCompactList(stealth));
//         }
//         finally
//         {
//             contextHandle.Free();
//         }
//     }

//     private static void GetTransactionByHashInternalHandler(IntPtr chain, IntPtr contextPtr, ErrorCode error, IntPtr transaction, UInt64 index, UInt64 height) {
//         GCHandle contextHandle = (GCHandle)contextPtr;
//         try
//         {
//             var context = (contextHandle.Target as Tuple<Action<ErrorCode, Transaction, UInt64, UInt64>, hash_t>);
//             Action<ErrorCode, Transaction, UInt64, UInt64> handler = context.Item1;
//             handler(error, new Transaction(transaction), index, height);
//         }
//         finally
//         {
//             contextHandle.Free();
//         }
//     }

//     private static void GetTransactionPositionInternalHandler(IntPtr chain, IntPtr contextPtr, ErrorCode error, UInt64 index, UInt64 height) {
//         GCHandle contextHandle = (GCHandle)contextPtr;
//         try
//         {
//             var context = (contextHandle.Target as Tuple<Action<ErrorCode, UInt64, UInt64>, hash_t>);
//             Action<ErrorCode, UInt64, UInt64> handler = context.Item1;
//             handler(error, index, height);
//         }
//         finally
//         {
//             contextHandle.Free();
//         }
//     }

//     private static void ResultInternalHandler(IntPtr chain, IntPtr context, ErrorCode error) {
//         GCHandle handlerHandle = (GCHandle)context;
//         try
//         {
//             Action<ErrorCode> handler = (handlerHandle.Target as Action<ErrorCode>);
//             handler(error);
//         }
//         finally
//         {
//             handlerHandle.Free();
//         }
//     }

//     private static void ValidateTransactionInternalHandler(IntPtr chain, IntPtr context, ErrorCode error, string message) {
//         GCHandle handlerHandle = (GCHandle)context;
//         try
//         {
//             var handler = (handlerHandle.Target as Action<ErrorCode, string>);
//             handler(error, message);
//         }
//         finally
//         {
//             handlerHandle.Free();
//         }
//     }
