require('dotenv').config();
const AppStore = require('./src/store/index');

class TodoAppCLI {
  async init() {
    await AppStore.init();
  }

  async getTodoList() {
    return AppStore.todos.data;
  }
}

const todoApp = new TodoAppCLI();
const test = async () => {
  await todoApp.init();
  const res = await todoApp.getTodoList()
  return res
}

test().then(console.log)