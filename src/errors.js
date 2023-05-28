// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

const errors = Object.freeze({
    // general codes
    /// The operation finished without errors
    success: 0,
    /// The operation is deprecated
    deprecated: 6,
    /// Unknown error
    unknown: 43,
    /// The resource not exist
    notFound: 3,
    /// File system error
    fileSystem: 42,
    /// Non-standard transaction
    nonStandard: 17,
    /// The operation isn't implemented
    notImplemented: 4,
    /// Service oversubscribed
    oversubscribed: 71,

    // network
    // Service is stopped
    serviceStopped: 1,
    /// The operation failed
    operationFailed: 2,
    /// Resolving hostname failed
    resolveFailed: 7,
    /// Unable to reach remote host
    networkUnreachable: 8,
    /// Address already in use
    addressInUse: 9,
    /// Incoming connection failed
    listenFailed: 10,
    /// Connection acceptance failed
    acceptFailed: 11,
    /// Bad data stream
    badStream: 12,
    /// Connection timed out
    channelTimeout: 13,
    /// Address blocked by policy
    addressBlocked: 44,
    /// Channel stopped
    channelStopped: 45,

    /// Unresponsive peer may be throttling

    peerThrottling: 73,

    // database

    /// Block duplicate

    storeBlockDuplicate: 66,

    /// Block out of order

    storeBlockInvalidHeight: 67,

    /// Block missing parent

    storeBlockMissingParent: 68,

    // blockchain

    /// Duplicate block

    duplicateBlock: 51,

    /// Missing block parent

    orphanBlock: 5,

    /// Previous block failed to validate

    invalidPreviousBlock: 24,

    /// Insufficient work to reorganize

    insufficientWork: 48,

    /// Transaction parent missing

    orphanTransaction: 14,

    /// Insufficient transaction fee

    insufficientFee: 70,

    /// Output value too low

    dustyTransaction: 76,

    /// Blockchain too far behind

    staleChain: 75,

    // check header

    /// Proof of work invalid

    invalidProofOfWork: 26,

    /// Timestamp too far in the future

    futuristicTimestamp: 27,

    // accept header

    /// Block hash rejected by checkpoint

    checkpointsFailed: 35,

    /// Block version rejected at current height

    oldVersionBlock: 36,

    /// Proof of work does not match bits field

    incorrectProofOfWork: 32,

    /// Block timestamp is too early

    timestampTooEarly: 33,

    // check block

    /// Block size limit exceeded

    blockSizeLimit: 50,

    /// Block has no transactions

    emptyBlock: 47,

    /// First transaction not a coinbase

    firstNotCoinbase: 28,

    /// More than one coinbase

    extraCoinbases: 29,

    /// Matching transaction hashes in block

    internalDuplicate: 49,

    /// Double spend internal to block

    blockInternalDoubleSpend: 15,

    /// Merkle root mismatch

    merkleMismatch: 31,

    /// Too many block legacy signature operations

    blockLegacySigopLimit: 30,

    /// Transactions out of order

    forwardReference: 79,

    // accept block

    /// Block contains a non-final transaction

    blockNonFinal: 34,

    /// Block height mismatch in coinbase

    coinbaseHeightMismatch: 37,

    /// Coinbase value too high

    coinbaseValueLimit: 41,

    /// Too many block embedded signature operations

    blockEmbeddedSigopLimit: 52,

    /// Invalid witness commitment

    invalidWitnessCommitment: 25,

    /// Block weight limit exceeded

    blockWeightLimit: 82,

    // check transaction

    /// Transaction inputs or outputs empty

    emptyTransaction: 20,

    /// Non-coinbase transaction has input with null previous output

    previousOutputNull: 23,

    /// Spend outside valid range

    spendOverflow: 21,

    /// Coinbase script too small or large

    invalidCoinbaseScriptSize: 22,

    /// Coinbase transaction disallowed in memory pool

    coinbaseTransaction: 16,

    /// Double spend internal to transaction

    transactionInternalDoubleSpend: 72,

    /// Transaction size limit exceeded

    transactionSizeLimit: 53,

    /// Too many transaction legacy signature operations

    transactionLegacySigopLimit: 54,

    // accept transaction

    /// Transaction currently non-final for next block

    transactionNonFinal: 74,

    /// Transaction validation under checkpoint

    prematureValidation: 69,

    /// Matching transaction with unspent outputs

    unspentDuplicate: 38,

    /// Previous output not found

    missingPreviousOutput: 19,

    /// double spend of input

    doubleSpend: 18,

    /// Immature coinbase spent

    coinbaseMaturity: 46,

    /// Spend exceeds input values sum

    spendExceedsValue: 40,

    /// Too many transaction embedded signature operations

    transactionEmbeddedSigopLimit: 55,

    /// Transaction currently locked

    sequenceLocked: 78,

    /// Transaction weight limit exceeded

    transactionWeightLimit: 83,

    // connect input

    /// Invalid script

    invalidScript: 39,

    /// Invalid script size

    invalidScriptSize: 56,

    /// Invalid push data size

    invalidPushDataSize: 57,

    /// Invalid operation count

    invalidOperationCount: 58,

    /// Invalid stack size

    invalidStackSize: 59,

    /// Invalid stack scope

    invalidStackScope: 60,

    /// Invalid script embed

    invalidScriptEmbed: 61,

    /// Invalid signature encoding

    invalidSignatureEncoding: 62,

    /// Invalid signature lax encoding

    invalidSignatureLaxEncoding: 63,

    /// Incorrect signature

    incorrectSignature: 64,

    /// Error processing script

    stackFalse: 65,

    /// Unexpected witness

    unexpectedWitness: 77,

    /// Invalid witness

    invalidWitness: 80,

    /// Dirty witness

    dirtyWitness: 81,

    // op eval
    opDisabled: 100,
    opReserved: 101,
    opPushSize: 102,
    opPushData: 103,
    opIf: 104,
    opNotIf: 105,
    opElse: 106,
    opEndIf: 107,
    opVerify1: 108,
    opVerify2: 109,
    opReturn: 110,
    opToAltStack: 111,
    opFromAltStack: 112,
    opDrop2: 113,
    opDup2: 114,
    opDup3: 115,
    opOver2: 116,
    opRot2: 117,
    opSwap2: 118,
    opIfDup: 119,
    opDrop: 120,
    opDup: 121,
    opNip: 122,
    opOver: 123,
    opPick: 124,
    opRoll: 125,
    opRot: 126,
    opSwap: 127,
    opTuck: 128,
    opSize: 129,
    opEqual: 130,
    opEqualVerify1: 131,
    opEqualVerify2: 132,
    opAdd1: 133,
    opSub1: 134,
    opNegate: 135,
    opAbs: 136,
    opNot: 137,
    opNonZero: 138,
    opAdd: 139,
    opSub: 140,
    opBoolAnd: 141,
    opBoolOr: 142,
    opNumEqual: 143,
    opNumEqualVerify1: 144,
    opNumEqualVerify2: 145,
    opNumNotEqual: 146,
    opLessThan: 147,
    opGreaterThan: 148,
    opLessThanOrEqual: 149,
    opGreaterThanOrEqual: 150,
    opMin: 151,
    opMax: 152,
    opWithin: 153,
    opRipemd160: 154,
    opSha1: 155,
    opSha256: 156,
    opHash160: 157,
    opHash256: 158,
    opCodeSeperator: 159,
    opCheckSigVerify1: 160,
    opCheckSig: 161,
    opCheckMultisigVerify1: 162,
    opCheckMultisigVerify2: 163,
    opCheckMultisigVerify3: 164,
    opCheckMultisigVerify4: 165,
    opCheckMultisigVerify5: 166,
    opCheckMultisigVerify6: 167,
    opCheckMultisigVerify7: 168,
    opCheckMultisig: 169,
    opCheckLocktimeVerify1: 170,
    opCheckLocktimeVerify2: 171,
    opCheckLocktimeVerify3: 172,
    opCheckLocktimeVerify4: 173,
    opCheckLocktimeVerify5: 174,
    opCheckLocktimeVerify6: 175,
    opCheckSequenceVerify1: 176,
    opCheckSequenceVerify2: 177,
    opCheckSequenceVerify3: 178,
    opCheckSequenceVerify4: 179,
    opCheckSequenceVerify5: 180,
    opCheckSequenceVerify6: 181,
    opCheckSequenceVerify7: 182
});

exports.errors = errors;
