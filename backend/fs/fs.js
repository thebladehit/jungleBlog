'use strict';

const fsp = require('node:fs').promises;

const readFile = async (path) => {
  const data = await fsp.readFile(path);
  return data;
};

const isFileExist = async (filePath) => {
  try {
    await fsp.access(filePath, fsp.constants.R_OK);
    return true;
  } catch (err) {
    return false;
  }
};

const appendFile = async (path, data) => {
  await fsp.appendFile(path, data);
};

const writeFile = async (path, data) => {
  await fsp.writeFile(path, data);
};

const createDir = async (dirPath) => {
  if (!await isFileExist(dirPath)) {
    await fsp.mkdir(dirPath);
  }
};

module.exports = { readFile, isFileExist, writeFile, createDir, appendFile };