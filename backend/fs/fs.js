const fsp = require('node:fs').promises;

const readFile = async (path) => {
  try {
    const data = await fsp.readFile(path);
    return data;
  } catch (err) {
    throw err;
  }
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
  try {
    await fsp.appendFile(path, data);
  } catch (err) {
    throw err;
  }
};

const writeFile = async (path, data) => {
  try {
    await fsp.writeFile(path, data);
  } catch (err) {
    throw err;
  }
};

const createDir = async (dirPath) => {
  try {
    if (!await isFileExist(dirPath)) {
      await fsp.mkdir(dirPath);
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { readFile, isFileExist, writeFile, createDir, appendFile };