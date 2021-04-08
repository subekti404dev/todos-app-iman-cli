const AppStore = require('./store/index');

class TodoAppClass {

  async init() {
    await AppStore.init();
    this.initialized = true;
  }

  async getAllTodos() {
    if (!this.isUseRemote) await this.init();
    return await AppStore.todos.data;
  }

  async getUndoneTodos() {
    try {
      const data = await this.getAllTodos();
      return data.filter(d => !d.done);
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  async getDoneTodos() {
    try {
      const data = await this.getAllTodos();
      return data.filter(d => d.done);
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  async done(id) {
    try {
      if (!this.isUseRemote) await this.init();
      await AppStore.todos.editItem(id, {
        done: true,
        updatedAt: new Date(),
      });
      await AppStore.todos.uploadIfOnline();
      return true;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  async undone(id) {
    try {
      if (!this.isUseRemote) await this.init();
      await AppStore.todos.editItem(id, {
        done: false,
        updatedAt: new Date(),
      })
      return true;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }


  async delete(id) {
    try {
      if (!this.isUseRemote) await this.init();
      await AppStore.todos.deleteItem(id);
      return true;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }
}

const todoApp = new TodoAppClass()
module.exports = todoApp;