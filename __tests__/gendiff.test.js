import fs from 'fs';
import path from 'path';
import gendiff from '../src/gendiff.js';

const __filename = (import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('stylish.txt');
const expectedPlain = readFile('plain.txt');
const expectedJSON = readFile('json.txt');

const extensions = ['yml', 'json'];

test.each([
  extensions,
])('main test', (extension) => {
  const filepath1 = getFixturePath(`before.${extension}`);
  const filepath2 = getFixturePath(`after.${extension}`);

  expect(genDiff(filepath1, filepath2)).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
  expect(genDiff(filepath1, filepath2, 'json')).toBe(expectedJSON);
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
  // expect(gendiff('__fixtures__/file01.json', '__fixtures__/file02.json')).toEqual(res);
// });
