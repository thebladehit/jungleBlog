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
}

module.exports = { readFile, isFileExist };