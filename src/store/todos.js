const PouchyStore = require( 'pouchy-store');

class TodoStore extends PouchyStore {
  get name() {
    return process.env.DB_NAME;
  }

  get urlRemote() {
    return process.env.DB_HOST;
  }

  get optionsRemote() {
    return {
      auth: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS
      },
    };
  }
}

const todoStore = new TodoStore();
module.exports = todoStore;