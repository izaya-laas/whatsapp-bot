import { promisify } from "util";
import fs from "fs";

const readFile = promisify(fs.readFile);

// const file = readFile("./line/order/quantity.json")
//   .then((data) => {
//     console.log(JSON.parse(data.toString()));
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// console.log(file.toString());

const array = [2, 3, 19, 8, 2, 0, 0, 2, 1, 23, 2];

const arrayFiltrado = array.filter((number) => number >= 1 && number <= 8);

const arrayFiltrado2 = [];
for (let i = 0; i < array.length; i++) {
  if (array[i] >= 1 && array[i] <= 8) arrayFiltrado2.push(array[i]);
  continue;
}

console.log(array);

console.log(arrayFiltrado);
console.log(arrayFiltrado2);
