import _ from 'lodash';

// Получаем массивы ключей обоих файлов
const buildTree = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);

  // Обьединяем 2 массива ключей в 1 и сортируем его
  const sortedKeys = _.sortBy(_.union(keys1, keys2));
  // console.log(sortedKeys);

  // Применяем функцию map к каждому элементу массива
  const result = sortedKeys.map((key) => {
    // Если первый файл не содержит ключ
    if (!_.has(file1, key)) {
      return {
        name: key,
        value: file2[key],
        type: 'added',
      };
    }
    // Если второй файл не содержит ключ
    if (!_.has(file2, key)) {
      return {
        name: key,
        value: file1[key],
        type: 'deleted',
      };
    }
    // Если значение по ключу в первом и втором обьекте - обьект,
    // То вызываем рекурсивно эту же функцию и передаем в нее значения - обьекты
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        name: key,
        type: 'nested',
        children: buildTree(file1[key], file2[key]),
      };
    }
    // Если значения отличаются
    if (file1[key] !== file2[key]) {
      return {
        name: key,
        value1: file1[key],
        value2: file2[key],
        type: 'changed',
      };
    }
    // Ключ и значение без изменений
    return {
      name: key,
      value: file1[key],
      type: 'unchanged',
    };
  });
  return result;
};

export default buildTree;
