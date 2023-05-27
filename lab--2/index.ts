import {AddUtil} from './src/task1';
import {isAnagram} from './src/task2';
import {copy} from './src/task3';
import {wrapper} from './src/task4';

const addObj = new AddUtil();
console.log("Task 1:");
console.log(addObj.add(1)(2)(3)());

console.log("Task 2:")
console.log(isAnagram("hello", "olleh"));

const someObj = {
    prop1: 'val1',
    prop2: 'prop2',
    prop3: ['prop31', 'prop32'],
    prop4: {
        a: 1,
        b: {
            a: 1,
            b: 2
        }
    }
}
const clone = copy(someObj);
console.log("Task 3:")
console.log(someObj===clone) //false
console.log(someObj.prop4.b.a === clone.prop4.b.a); //false

console.log("Task 4:")
const calc = (a:number,b:number,c:number)=>{return a+b+c};
const cachedCalc = wrapper(calc);
cachedCalc(2,2,3); //calculated
cachedCalc(5,8,1); //calculated
cachedCalc(2,2,3); //from cache
