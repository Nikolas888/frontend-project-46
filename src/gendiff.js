import fs from 'fs';
import path from 'path';
import bubbleSort from '../bin/bubbleSort.js';

export default (filepath1, filepath2) => {
  // Читаем первый файл и парсим его превращая в обьект
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));

  // Читаем второй файл и парсим его превращая в обьект
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));

  // Получаем вложенный массив [ключ, значение] из обьектов
  const m1 = Object.entries(obj1);
  const m2 = Object.entries(obj2);

  // Получаем  массив ключей из обьектов
  const m1Keys = Object.keys(obj1);
  const m2Keys = Object.keys(obj2);

  const result = [];
  let finish = '';

  // Сравниваем первый массив со вторым.
  /* eslint-disable-next-line */
  for (const [keyfirst, valuefirst] of m1) {
    /* eslint-disable-next-line */
    for (const [keysecond, valuesecond] of m2) {
      // Если ключ и значение совпадают.
      if (keyfirst === keysecond && valuefirst === valuesecond) {
        result.push(`  ${keyfirst}: ${valuefirst}`);
      } else if (keyfirst === keysecond && valuefirst !== valuesecond) {
        // Если ключ совпадает, а значение нет.
        result.push(`- ${keyfirst}: ${valuefirst}`);
        result.push(`+ ${keyfirst}: ${valuesecond}`);
      }
    }

    // Если 2й массив не содержит ключ 1го массива
    if (!m2Keys.includes(keyfirst)) {
      result.push(`- ${keyfirst}: ${valuefirst}`);
    }
  }

  // Сравниваем второй массив с первым.

  /* eslint-disable-next-line */
  for (const [keysecond, valuesecond] of m2) {
    // Если 1й массив не содержит ключ 2го массива
    if (!m1Keys.includes(keysecond)) {
      result.push(`+ ${keysecond}: ${valuesecond}`);
    }
  }

  // Запускаем пузырьковую сортировку по 3му сиволу и изменяем исходный массив
  bubbleSort(result);

  // Преобразуем массив в строку
  /* eslint-disable-next-line */
  for (const i of result) {
    finish = `${finish + i}\n`;
  }
  finish = `{\n${finish}}`;

  console.log(finish);
};
