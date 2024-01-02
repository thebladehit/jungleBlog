'use strict'

const { Cacher } = require('./cacher.js');
const { CACHE_LIMIT_MB } = require('../config/config.js');

const cacher = new Cacher(CACHE_LIMIT_MB);

module.exports = { cacher };