import {execute} from "./db";
import * as queries from './queries';

const task3Name = 'Stephanie Bulger';
const task4Id = "79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76";
const task5Date = '1/9/2021';
const task6Name = "Ennis Haestier";


execute(queries.task1Query()).then(res=>console.log(res.rows));
execute(queries.task2Query()).then(res=>console.log(res.rows));
execute(queries.task3Query(task3Name)).then(res=>console.log(res.rows));
execute(queries.task4Query(task4Id)).then(res=>console.log(res.rows));
execute(queries.task5Query(task5Date)).then(res=>console.log(res.rows));
execute(queries.task6Query(task6Name)).then(res=>console.log(res.rows));


