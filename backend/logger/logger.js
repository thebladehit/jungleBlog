const path = require('node:path');
const { appendFile, createDir } = require('../fs/fs.js');

class Logger {
  constructor(dirName) {
    this.dirName = dirName;
    return this.init();
  }

  async init() {
    await createDir(path.join(this.dirName, '..'));
    await createDir(this.dirName);
    await createDir(path.join(this.dirName, 'error'));
    await createDir(path.join(this.dirName, 'logs'));
    return this;
  }

  async log(message) {
    const date = new Date();
    const fileName = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.log`;
    const filePath = path.resolve(this.dirName, 'logs', fileName);
    const data = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${message}\n`;
    await appendFile(filePath, data);
  }

  async error(err) {
    const date = new Date();
    const fileName = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.log`;
    const filePath = path.resolve(this.dirName, 'error', fileName);
    const data = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${err.message}\n`;
    await appendFile(filePath, data);
  }
}

module.exports = { Logger };