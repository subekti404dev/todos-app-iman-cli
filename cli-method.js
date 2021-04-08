const TodoApp = require('./src/todos-app');
const chalk = require('chalk');
const moment = require('moment');
const _ = require('lodash');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = async (question) => {
  return new Promise((resolve) => {
    return readline.question(question, answer => {
      resolve(answer);
    });
  })
}


const getUndoneTodos = async () => {
  let data = await TodoApp.getUndoneTodos();
  if (!data) data = [];
  if (data.length > 0) {
    const maxTextLength = _.maxBy(data, (x) => x.text.length).text.length + 3;
    console.log("");
    console.log(chalk.green("============ TODO ============"))
    for (var i = 0; i < data.length; i++) {
      const item = data[i];
      const spaceLength = maxTextLength - item.text.length;
      console.log(chalk.yellow(`[${i + 1}]`) + ' ' + chalk.green(`${item.text}`) + addSpaces(spaceLength) + chalk.blue(`${moment(item.createdAt).format('DD MMM YYYY - HH:mm')}`) + "  " + chalk.grey(`[ ${item.tags.join(", ")} ]`))
    }
    console.log("");
  } else {
    console.log("");
    console.log(chalk.grey("EMPTY"))
    console.log("");

  }
  return data;
}

const addSpaces = (length) => {
  return _.range(length).map(() => ' ').join('');
}


const doDone = async () => {
  const todos = await getUndoneTodos();
  if (todos.length === 0) {
    process.exit(0);
  }
  const numString = await input('Please input number of todo: ');
  let number;
  try {
    number = parseInt(numString)
    if (isNaN(number)) throw new Error('not a number')
  } catch (error) {
    console.log(chalk.red('Its not a number'));
    process.exit();
  }

  if (number > todos.length) {
    console.log(chalk.red(`Number must smaller than amount of todos`));
    process.exit();
  }

  if (number <= 0) {
    console.log(chalk.red(`Number must greater than 0`));
    process.exit();
  }

  const todo = todos[number - 1];

  await TodoApp.done(todo._id);
  console.log(chalk.green("Task marked as done"));
  process.exit()
}

const doDelete = async () => {
  const todos = await getUndoneTodos();
  if (todos.length === 0) {
    process.exit(0);
  }
  const numString = await input('Please input number of todo: ');
  let number;
  try {
    number = parseInt(numString)
    if (isNaN(number)) throw new Error('not a number')
  } catch (error) {
    console.log(chalk.red('Its not a number'));
    process.exit();
  }

  if (number > todos.length) {
    console.log(chalk.red(`Number must smaller than amount of todos`));
    process.exit();
  }

  if (number <= 0) {
    console.log(chalk.red(`Number must greater than 0`));
    process.exit();
  }

  const todo = todos[number - 1];

  await TodoApp.delete(todo._id);
  console.log(chalk.green("Task deleted"));
  process.exit()
}


const add = async () => {
  const text = await input('Please input task content here: ');
  if (!text) {
    console.log(chalk.red("Task content is required"));
    process.exit()
  }
  const tagsStr = await input('Please input task tags here (separate with comma): ');
  const tags = tagsStr.split(',').filter(z => z).map(x => x.trim());
  await TodoApp.add(text, tags);
  console.log(chalk.green("Task created"));
  process.exit()
}

const sync = async () => {
  await TodoApp.sync();
  console.log(chalk.green("Sync Success\n"));

  await getUndoneTodos();
  process.exit();
}

const list = async () => {
  await getUndoneTodos()
  process.exit()
}

module.exports = {
  add,
  sync,
  doDelete,
  doDone,
  list
}