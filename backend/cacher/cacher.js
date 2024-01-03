'use strict';

class Cacher {
  cache = new Map();

  constructor(maxMemory) {
    this.maxMemory = maxMemory;
  }

  setCache(key, value) {
    this.cache.set(key, value);
  }

  getCache(key) {
    return this.cache.get(key);
  }

  deleteCache(key) {
    this.cache.delete(key);
  }
}

module.exports = { Cacher };