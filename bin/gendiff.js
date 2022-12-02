#!/usr/bin/env node
const { program } = require('commander');
var fs = require('fs');
const path = require('path');

program
  // .option('-v, --version', 'output the version number')
  // .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
  // .option('-h, --help', 'display help for command')
  // .description('An application for pizza ordering')
  // .action(console.log('112'))
  .argument('<filepath1>', 'path to first file.json')
  .argument('<filepath2>', 'path to second file.json')
  .action(gendiff = (filepath1, filepath2) => {
    
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
    for (const [key1, value1] of m1) {
      for (const [key2, value2] of m2) {
    
        //Если ключ и значение совпадают. 
    if (key1 === key2 && value1 === value2) {
      result.push(`  ${key1}: ${value1}`)
    }
    
    // Если ключ совпадает, а значение нет. 
    else if (key1 === key2 && value1 !== value2) {
      result.push(`- ${key1}: ${value1}`);
      result.push(`+ ${key1}: ${value2}`)
    }
      }
    
      // Если 2й массив не содержит ключ 1го массива
      if (!m2Keys.includes(key1)) {
        result.push(`- ${key1}: ${value1}`);
      }
    }
    
    // Сравниваем второй массив с первым.
    
    for (const [key2, value2] of m2) {
      // Если 1й массив не содержит ключ 2го массива
      if (!m1Keys.includes(key2)) {
        result.push(`+ ${key2}: ${value2}`);
      }
    }
    
    // Сортируем массив результата по 3му сиволу пузырьковой сортировкой
    const bubbleSort = (coll) => {
      let stepsCount = coll.length - 1;
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
          if (coll[i][2] > coll[i + 1][2]) {
            // temp – временная константа для хранения текущего элемента
            const temp = coll[i];
            coll[i] = coll[i + 1];
            coll[i + 1] = temp;
            // Если сработал if и была совершена перестановка,
            // присваиваем swapped значение true
            swapped = true;
          }
        }
        // Уменьшаем счетчик на 1, т.к. самый большой элемент уже находится
        // в конце массива
        stepsCount -= 1;
      } while (swapped); // продолжаем, пока swapped === true
    
      return coll;
    };
    
    //Запускаем пузырьковую сортировку и изменяем исходный массив
    bubbleSort(result);

    //Преобразуем массив в строку
    for (const i of result) {
      finish = finish + i + '\n';
    }
    finish = `{\n${finish}}`;

    console.log(finish);
    })

program.parse();

