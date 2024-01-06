'use strict';

const { Cacher } = require('./cacher.js');
const { CACHE_LIMIT_ITEMS } = require('../config/config.js');

const cacher = new Cacher(CACHE_LIMIT_ITEMS);

module.exports = { cacher };