import _ from 'lodash';

const createIndent = (level) => {
  const replacer = '  ';
  const spacesCount = 2;
  const indentSize = level * spacesCount;

  const indents = {
    openBracket: replacer.repeat(indentSize - 1),
    closeBracket: replacer.repeat(indentSize - spacesCount),
  };

  return indents;
};

const stringify = (val, depth) => {
  if (!_.isObject(val)) {
    return String(val);
  }
  const indents = createIndent(depth);

  const lines = Object.entries(val).map(([key, value]) => {
    if (!_.isObject(value)) {
      return `${indents.openBracket}  ${key}: ${value}`;
    }

    return `${indents.openBracket}  ${key}: ${stringify(value, depth + 1)}`;
  });

  return ['{', ...lines, `${indents.closeBracket}}`].join('\n');
};

// передаем дерево и счетчик = 1
const stylish = (tree, depth = 1) => {
  const indents = createIndent(depth);

  // Применяем мапинг к обьекту-дереву и формируем вывод в зависимости от типа ключа + - ...
  // С каждым проходом увеличиваем счетчик на 1
  const items = tree.map((item) => {
    const makeValue = stringify(item.value, depth + 1);

    switch (item.type) {
      case 'added':
        return `${indents.openBracket}+ ${item.name}: ${makeValue}`;
      case 'deleted':
        return `${indents.openBracket}- ${item.name}: ${makeValue}`;
      case 'changed':
        return `${indents.openBracket}- ${item.name}: ${stringify(item.value1, depth + 1)}\n${indents.openBracket}+ ${item.name}: ${stringify(item.value2, depth + 1)}`;
      case 'unchanged':
        return `${indents.openBracket}  ${item.name}: ${makeValue}`;
      case 'nested':
        return `${indents.openBracket}  ${item.name}: ${stylish(item.children, depth + 1)}`;
      default:
        throw new Error('Unknown type.');
    }
  });
  return ['{', ...items, `${indents.closeBracket}}`].join('\n');
};

export default stylish;
