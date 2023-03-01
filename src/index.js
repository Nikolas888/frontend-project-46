import fs from 'fs';
import path from 'path';
import parsers from './parse.js';
import buildTree from './build_tree.js';
import format from './formatters/index.js';

// Получаем формат файла после точки
const getFormat = (filepath) => path.extname(filepath).slice(1);

// Преобразуем относительный путь в абсолютный
const getFixturePath = (filepath) => path.resolve(process.cwd(), filepath);

// Читаем файл с абсолютным путем
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath, 'utf-8'));

export default (filepath1, filepath2, formatName = 'stylish') => {
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

  // Получаем обьединенный отсортированный обьект с типами ключей
  const tree = buildTree(file1, file2);
  // console.log(tree);

  // Получаем вывод в зависимости от формата. По умолчанию formatName = stylish
  return format(tree, formatName);
};
