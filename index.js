import AppStore from './src/store/index';
require('dotenv').config();

class TodoAppCLI {
  async init() {
    await AppStore.init();
  }

  async getTodoList() {
    return AppStore.todos
  }
}

const todoApp = new TodoAppCLI();
const test = async () => {

  await todoApp.init();
  const res = await todoApp.getTodoList()
  console.log(res);
}

test()