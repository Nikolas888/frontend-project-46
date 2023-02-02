// Сортируем массив результата по 3му сиволу пузырьковой сортировкой
const bubbleSort = (x) => {
  let stepsCount = x.length - 1;
  // Объявляем переменную swapped, значение которой показывает,
  // был ли совершен обмен элементов во время перебора массива
  let swapped;
  // do..while цикл. Работает почти идентично while
  // Разница в проверке. Тут она делается не до выполнения тела, а после.
  // Такой цикл полезен там, где надо выполнить тело хотя бы раз в любом случае.
  do {
    swapped = false;
    // Перебираем массив и меняем местами элементы, если предыдущий
    // больше, чем следующий
    for (let i = 0; i < stepsCount; i += 1) {
      if (x[i][2] > x[i + 1][2]) {
        // temp – временная константа для хранения текущего элемента
        const temp = x[i];
        x[i] = x[i + 1];
        x[i + 1] = temp;
        // Если сработал if и была совершена перестановка,
        // присваиваем swapped значение true
        swapped = true;
      }
    }
    // Уменьшаем счетчик на 1, т.к. самый большой элемент уже находится
    // в конце массива
    stepsCount -= 1;
  } while (swapped); // продолжаем, пока swapped === true

  return x;
};

// module.exports = { bubbleSort };
export default bubbleSort;
