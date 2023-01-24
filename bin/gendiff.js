#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/gendiff.js';

const program = new Command();
program
  // .option('-v, --version', 'output the version number')
  // .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  // .option('-h, --help', 'display help for command')
  // .description('An application for pizza ordering')
  // .action(console.log('112'))
  .argument('<filepath1>', 'path to first file.json')
  .argument('<filepath2>', 'path to second file.json')
  .action((filepath1, filepath2) => {
    gendiff(filepath1, filepath2);
  });

program.parse();
