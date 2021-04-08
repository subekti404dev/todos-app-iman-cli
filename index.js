require('dotenv').config();
const CLI = require('./cli-method')
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

if (Object.keys(argv).length <= 2) {
  CLI.help();
}

if (argv.list) {
  CLI.list();
}

if (argv.done) {
  CLI.doDone();
}

if (argv.sync) {
  CLI.sync();
}


if (argv.delete) {
  CLI.doDelete()
}

if (argv.add) {
  CLI.add();
}