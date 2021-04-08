require('dotenv').config();
const TodoApp = require('./src/TodosApp');
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
const chalk = require('chalk');
const moment = require('moment');
const _ = require('lodash');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = async (question) => {
  return new Promise((resolve) => {
    readline.question(question, answer => {
      resolve(answer);
      readline.close()
    });
  })
}


const getUndoneTodos = async () => {
  let data = await TodoApp.getUndoneTodos();
  if (!data) data = [];
  if (data.length > 0) {
    const maxTextLength = _.maxBy(data, (x) => x.text.length).text.length + 3;
    console.log("");
    console.log(chalk.green("========== TO BE DONE =========="))
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
  console.log(chalk.green("Success"));
  process.exit()
}

if (argv.list) {
  getUndoneTodos()
    .then(() => process.exit())
    .catch((e) => {
      console.log(e.message);
      process.exit();
    })
}

if (argv.done) {
  doDone()
}


