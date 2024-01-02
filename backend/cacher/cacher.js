'use strict';

class Cacher {
  foreverCache = new Map();
  cache = new Map();

  constructor(maxMemory) {
    this.maxMemory = maxMemory;
  }

  setForeverCache(key, value) {
    this.foreverCache.set(key, value);
    console.log(this.foreverCache); //log
  }

  setCache(key, value) {
    console.log(this.cache); // log
    console.log(process.memoryUsage()); // log
    this.cache.set(key, value);
  }

  getCache(key) {
    const fromForeverCache = this.foreverCache.get(key);
    if (fromForeverCache) return fromForeverCache;
    return this.cache.get(key);
  }

  deleteCache(key) {
    this.cache.delete(key);
  }
}

module.exports = { Cacher };