'use strict';

class Cacher {
  cache = new Map();

  constructor(maxItemInCache) {
    this.maxItemInCache = maxItemInCache;
  }

  setCache(key, value) {
    if (this.cache.size > this.maxItemInCache) this.releaseCache();
    value.usage = 0;
    this.cache.set(key, value);
  }

  getCache(key) {
    const cache = this.cache.get(key);
    if (cache) cache.usage++;
    return cache;
  }

  deleteCache(key) {
    this.cache.delete(key);
  }

  releaseCache() {
    let minKey;
    let minValue = Infinity;
    for (const [key, value] of this.cache) {
      if (value.usage < minValue) {
        minValue = value.usage;
        minKey = key;
      }
    }
    this.deleteCache(minKey);
  }
}

module.exports = { Cacher };