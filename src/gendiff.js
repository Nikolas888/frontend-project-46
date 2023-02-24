import fs from 'fs';
import path from 'path';
import parsers from './parse.js';
import buildTree from './build_tree.js';
// import bubbleSort from '../bin/bubbleSort.js';
import format from './formatters/index.js';

// import yaml from 'js-yaml';

// Получаем формат файла после точки
const getFormat = (filepath) => path.extname(filepath).slice(1);
console.log(getFormat('/home/nik/projects/frontend-project-46/src/gendiff.js'));

// Преобразуем относительный путь в абсолютный
const getFixturePath = (filepath) => path.resolve(process.cwd(), filepath);
console.log(getFixturePath('src/gendiff.js'));
// console.log('/home/nik/projects/frontend-project-46/src/gendiff.js');
console.log(getFixturePath('__fixtures__/file1.yml'));

// Читаем файл с абсолютным путем
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath, 'utf-8'));
// console.log(readFile('bin/file1.json'));
// console.log(readFile('__fixtures__/file1.yml'));
// console.log('eeeeeeeeee');
// console.log(parsers('/home/nik/projects/frontend-project-46/__fixtures__/file1.yml', 'yml'));
// const readFile12 = readFile('__fixtures__/file1.yml');
// console.log(yaml.load(readFile12));



export default (filepath1, filepath2, formatName) => {
  // Читаем первый файл и парсим его превращая в обьект
  // const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));

  // Читаем файлы 
  const readFile1 = readFile(filepath1);
  const readFile2 = readFile(filepath2);

  // Читаем второй файл и парсим его превращая в обьект
  // const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));

  // Парсим файлы 
  const file1 = parsers(readFile1, getFormat(filepath1));
  const file2 = parsers(readFile2, getFormat(filepath2));
  // const file3 = parsers(readFile('__fixtures__/file1.yml'), 'yml');
  // console.log(file1);
  const tree = buildTree(file1, file2);
  console.log(tree);

  console.log(formatName);
  console.log(format(tree, formatName));
  return format(tree, formatName);

  // Получаем вложенный массив [ключ, значение] из обьектов
  // const m1 = Object.entries(obj1);
  // const m2 = Object.entries(obj2);

  // Получаем  массив ключей из обьектов
  // const m1Keys = Object.keys(obj1);
  // const m2Keys = Object.keys(obj2);

  // const result = [];
  // let finish = '';

  // Сравниваем первый массив со вторым.
  /* eslint-disable-next-line */
  // for (const [keyfirst, valuefirst] of m1) {
    /* eslint-disable-next-line */
    // for (const [keysecond, valuesecond] of m2) {
      // Если ключ и значение совпадают.
      // if (keyfirst === keysecond && valuefirst === valuesecond) {
        // result.push(`  ${keyfirst}: ${valuefirst}`);
      // } else if (keyfirst === keysecond && valuefirst !== valuesecond) {
        // Если ключ совпадает, а значение нет.
        // result.push(`- ${keyfirst}: ${valuefirst}`);
        // result.push(`+ ${keyfirst}: ${valuesecond}`);
      // }
    // }

    // Если 2й массив не содержит ключ 1го массива
    // if (!m2Keys.includes(keyfirst)) {
      // result.push(`- ${keyfirst}: ${valuefirst}`);
    // }
  // }

  // Сравниваем второй массив с первым.

  /* eslint-disable-next-line */
  // for (const [keysecond, valuesecond] of m2) {
    // Если 1й массив не содержит ключ 2го массива
    // if (!m1Keys.includes(keysecond)) {
      // result.push(`+ ${keysecond}: ${valuesecond}`);
    // }
  // }

  // Запускаем пузырьковую сортировку по 3му сиволу и изменяем исходный массив
  // bubbleSort(result);

  // Преобразуем массив в строку
  /* eslint-disable-next-line */
  // for (const i of result) {
    // finish = `${finish + i}\n`;
  // }
  // finish = `{\n${finish}}`;

  // console.log(finish);
  // return finish;
};
