# Contributing

Firstly, thank you for considering contributing to this project. We appreciate your time and effort. Please read the following guidelines before contributing.

## How can I contribute?

Karya is in no way a finished project. There's always room for improvements. Be it in terms of performance or documentation ro adding new features or fixing bugs! Following are some of the ways one can contribute to Karya:

1. Documentation - There is never enough documentation to explain something simply by reading it. But we can try!
2. Bug Fix - Noticed a bug? Just report it! Or if you're a seluth, go and raise a PR! This is in no way a bug-free software.
3. New Features - Currently the python client is a web-based client beacause the _karya server_ itself supports REST calls currently. But who knows, in the future we might move to something better!
4. Refactoring - There are always better ways to write a code. Go ahead and give it a shot at writing this client better, to make it more concise and easier to read.

## Local Setup

1. Clone the repository
2. Make sure node and npm are installed on your system. If not, install them from [here](https://nodejs.org/en/download/)
2. Install the dependencies
```shell
npm install
```
3. Run the sample examples provided in the [samples](../samples/) directory
```shell
node ./samples/<sample-to-run>.js
```

## Naming Conventions

- **File Names**: File names should be in `kebab-case` (all lowercase with words separated by hyphens).
- **Variable Names**: Variable names should be in `snake_case` (all lowercase with words separated by underscores).
- **Function Names**: Function names should be in `camelCase` (first word in lowercase and subsequent words in uppercase).
- **Class Names**: Class names should be in `PascalCase` (all words in uppercase).

## Formatting and Linting

**NOTE:** Only commits with correctly formatted and linted code will ab allowed to merge to main.

1. Run the following command to format the code

```shell
npm run format
```
2. Run the following command to lint the code

> ESLint version `v8.57.1` is used for linting. Please make sure you have the same version installed on your system.

```shell
npm run lint:fix
```