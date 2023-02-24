#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'path to first file.json')
  .argument('<filepath2>', 'path to second file.json')
  .action((filepath1, filepath2, options) => {
    console.log(gendiff(filepath1, filepath2, options.format));
  });

program.parse();
