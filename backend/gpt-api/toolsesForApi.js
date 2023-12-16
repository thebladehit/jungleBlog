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

const convertFromB64toBuffer = (stringB64) => {
  return Buffer.from(stringB64, 'base64');
}

module.exports = {
 requestBenchMark,
 convertFromB64toBuffer
};