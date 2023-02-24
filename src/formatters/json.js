// Преобразуем обьект в строку
const json = (tree) => JSON.stringify(tree, null, ' '.repeat(2));

export default json;
