import gendiff from '../src/gendiff.js';
import fs from 'fs';
import path from 'path';

const __filename = (import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
console.log('__filename')


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
