'use strict';

const requestBenchMark = (fn, ...params) => {
  try {
    const startTime = Date.now();
    const data = fn(...params);
    const deltaTime = Date.now() - startTime;
    return {data, deltaTime};
  } catch (err) {
    throw err;
  }
};

module.exports = {
 requestBenchMark
};