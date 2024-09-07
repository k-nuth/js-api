// Copyright (c) 2016-2024 Knuth Project developers.
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

class LazySequence {
    constructor(generatorFunc) {
        this.generatorFunc = generatorFunc;
    }

    *[Symbol.iterator]() {
        yield* this.generatorFunc();
    }

    take(count) {
        const self = this;
        return new LazySequence(function*() {
            let index = 0;
            for (let item of self) {
                if (index++ < count) yield item;
                else break;
            }
        });
    }

    map(transformFunc) {
        const self = this;
        return new LazySequence(function*() {
            for (let item of self) {
                yield transformFunc(item);
            }
        });
    }

    toArray() {
        return [...this];
    }
}

exports.LazySequence = LazySequence;