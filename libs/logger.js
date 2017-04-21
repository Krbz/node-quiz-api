const secrets = require('../config/secrets.json');
const fs = require('fs');

const env = process.env.NODE_ENV || 'production';
const debug = secrets[env].debug;

const consoleDebug = debug.console;
const fileDebug = debug.file;
const fileName = debug.filename;

function Logger({message}) {
  if (fileDebug) {
    const logger = fs.createWriteStream(__dirname + `/../public/${fileName}`, {
      flags: 'a',
    });

    logger.write(`[${new Date()}]: Env: ${env}, Message: ${message}\n`);
  }


  if (consoleDebug) {
    console.log(`[${new Date()}]: Env: ${env}, Message: ${message}`);
  }
}

module.exports = Logger;
