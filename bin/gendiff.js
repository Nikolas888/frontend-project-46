#!/usr/bin/env node
const { program } = require('commander');

// const command = () => {
//   console.log('Hello, World!');
// };

// program
//   .version('0.0.1')
//   .action(command)
//   .parse(process.argv);

program
  .option('-v, --version', 'output the version number')
  .option('-h, --help', 'display help for command')

program.parse(process.argv);

const options = program.opts();
// if (options.debug) console.log(options + '123');
if (options.version) console.log('version -> 1.0.0');
if (options.help) console.log('display help for command');
// console.log('pizza details:');
// if (options.small) console.log('- small pizza size2');
// if (options.pizzaType) console.log(`- ${options.pizzaType}`);