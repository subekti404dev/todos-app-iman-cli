import todoStore from "./todos"

class AppStore {
 
  async init() {
    await todoStore.initialize();
    this._initialized = true;
  }

  get todos() {
    return todoStore
  }
}

export default new AppStore();