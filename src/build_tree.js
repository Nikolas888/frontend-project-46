import _ from 'lodash';

const file1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  };

const file2 = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
  };
  console.log(file1);
  console.log(file2);

// Получаем массивы ключей обоих файлов
const buildTree = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);

//   console.log(keys1);
//   console.log(keys2);

// Обьединяем 2 массива ключей в 1 и сортируем его
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  console.log(sortedKeys);

    // Применяем функцию map к каждому элементу массива
  const result = sortedKeys.map((key) => {
    // Если первый файл не содержит ключ
    if (!_.has(file1, key)) {
        // console.log({
        // name: key,
        // value: file2[key],
        // type: 'added',
        // });
      return {
        name: key,
        value: file2[key],
        type: 'added',
      };
    }
    // Если второй файл не содержит ключ
    if (!_.has(file2, key)) {
        console.log({
            name: key,
            value: file1[key],
            type: 'deleted',
          });
      return {
        name: key,
        value: file1[key],
        type: 'deleted',
      };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        name: key,
        type: 'nested',
        children: buildTree(file1[key], file2[key]),
      };
    }
    if (file1[key] !== file2[key]) {
      return {
        name: key,
        value1: file1[key],
        value2: file2[key],
        type: 'changed',
      };
    }
    return {
      name: key,
      value: file1[key],
      type: 'unchanged',
    };
  });
  return result;
};

buildTree(file1, file2);

export default buildTree;