const PouchDB = require('./libs/PouchDB.js');
const IPouchyStore = require('./PouchyStore.js');
const reactNativeSqlitePlugin = require('./libs/pouchdb-adapter-react-native-sqlite');

PouchDB.plugin(reactNativeSqlitePlugin);

class PouchyStore extends IPouchyStore {
  constructor() {
    super();
    this.optionsLocal.adapter = 'react-native-sqlite';
  }
}

module.exports = PouchyStore;