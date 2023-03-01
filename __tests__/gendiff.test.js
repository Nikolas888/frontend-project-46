import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__filename);
// console.log(__dirname);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// console.log(getFixturePath('expectedResultStylish.txt'));
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedResultStylish = readFile('expectedResultStylish.txt');
const expectedResultPlain = readFile('expectedResultPlain.txt');
const expectedResultJson = readFile('expectedResultJson.txt');

const formatsFiles = ['json', 'yaml', 'yml'];

test.each(formatsFiles)('diff formats of files (.json .yaml .yml)', (extension) => {
  const fileName1 = `${process.cwd()}/__fixtures__/file1.${extension}`;
  const fileName2 = `${process.cwd()}/__fixtures__/file2.${extension}`;

  expect(gendiff(fileName1, fileName2, 'stylish')).toEqual(expectedResultStylish);
  expect(gendiff(fileName1, fileName2, 'plain')).toEqual(expectedResultPlain);
  expect(gendiff(fileName1, fileName2, 'json')).toEqual(expectedResultJson);
  expect(gendiff(fileName1, fileName2)).toEqual(expectedResultStylish);
  console.log(`1${fileName1}`);
  console.log(`2${fileName2}`);
});

