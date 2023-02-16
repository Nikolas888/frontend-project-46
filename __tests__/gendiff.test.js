import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/gendiff.js';
import fs from 'fs';


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
  console.log('1' + fileName1);
  console.log('2' + fileName2);
});

/* eslint-disable-next-line */
// test('gendiff', () => {
// const a = {
//     "host": "hexlet.io",
//     "timeout": 50,
//     "proxy": "123.234.53.22",
//     "follow": false
//   };
//   const b = {
//     "timeout": 20,
//     "verbose": true,
//     "host": "hexlet.io"
//   }
// const res = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';
/* eslint-disable-next-line */
  // expect(gendiff('/home/nik/projects/frontend-project-46/__fixtures__/file01.json', '/home/nik/projects/frontend-project-46/__fixtures__/file02.json')).toEqual(res);
// });
