const path = require('node:path');
const { writeFile, createDir } = require('../fs/fs.js');

class Logger {
  constructor(dirName) {
    this.dirName = dirName;
    return this.init();
  }

  async init() {
    await createDir(this.dirName);
    return this;
  }

  async log(err) {
    const date = new Date();
    const fileName = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.log`;
    const filePath = path.resolve(this.dirName, fileName);
    const data = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${err.message}\n`;
    await writeFile(filePath, data);
  }
}

module.exports = { Logger };