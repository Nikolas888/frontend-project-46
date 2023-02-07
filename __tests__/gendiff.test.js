import gendiff from '../src/gendiff.js';

test('gendiff', () => {
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
  const res = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

  expect(gendiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json')).toEqual(res);
});
