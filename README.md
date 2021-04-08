# Todos CLI App by Iman
## Screenshot
![Todos App](https://media.giphy.com/media/NovDg8O2cyofp8NsbF/giphy.gif)

## How to Install
There are two methods to install this app
### 1. Install as global module
```bash
    npm install -g github:subekti404dev/todos-app-iman-cli
    # or
    yarn global add github:subekti404dev/todos-app-iman-cli

    # then to run it just type like this
    todos-app-iman-cli [ command ]
```
### 2. Clone the project
```bash
  # clone repository
  git clone https://github.com/subekti404dev/todos-app-iman-cli

  # install dependencies
  cd todos-app-iman-cli && npm install     # or yarn install

  # run the app
  node index.js [ command ]

```


## How to Use
Here is list of commands that can be used on this app
```bash

   --list      Show undone tasks or todo
   --add       Create new task or todo
   --done      Mark task or todo as done
   --delete    Delete task or todo from database
   --sync      Upload and download tasks from remote database

```