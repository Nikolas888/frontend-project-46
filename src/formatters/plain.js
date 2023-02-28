import _ from 'lodash';

// console.log(_.isObject(()=>''));

const stringify = (value) => {
  // проверяем, является ли обьектом
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof (value) === 'string' ? `'${value}'` : String(value);
};

const plain = (tree) => {
  const iter = (currentValue, path) => {
    const lines = currentValue
      .filter(({ type }) => type !== 'unchanged')
      .map((item) => {
        const keys = [...path, item.name];
        // console.log(keys);
        const property = keys.join('.');
        // console.log(property);

        switch (item.type) {
          case 'added':
            return `Property '${property}' was added with value: ${stringify(item.value)}`;
          case 'deleted':
            return `Property '${property}' was removed`;
          case 'changed':
            return `Property '${property}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
          case 'nested':
            return iter(item.children, keys);
          default:
            throw new Error('Unknown type');
        }
      });
    return lines.join('\n');
  };

  return iter(tree, []);
};

export default plain;
