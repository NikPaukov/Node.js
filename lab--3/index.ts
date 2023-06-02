import { arrayChangeDelete } from './src/task2';
import {readFile} from './src/task3';
import {monitor} from "./src/task4";

const array = [1, 2, 3, 6, 7, 9];
console.log("Task2:\narray:" + array);
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);
console.log("array after delete:" +array)
console.log("deleted els array:" +deletedElements)

//readFile();

//monitor();