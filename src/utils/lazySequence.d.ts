// Copyright (c) 2016-2023 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

declare class LazySequence<T> {
    constructor(generatorFunc: () => Generator<T>);
    take(count: number): LazySequence<T>;
    map<U>(transformFunc: (item: T) => U): LazySequence<U>;
    toArray(): T[];
}

export = LazySequence;
