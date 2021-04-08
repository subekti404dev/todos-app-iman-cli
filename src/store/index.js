const todoStore = require ("./todos")

class AppStore {
 
  async init() {
    await todoStore.initialize();
    this._initialized = true;
  }

  get todos() {
    return todoStore
  }
}

const appStore = new AppStore();
module.exports = appStore;