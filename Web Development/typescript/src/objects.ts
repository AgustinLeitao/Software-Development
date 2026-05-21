enum Role {
  ADMIN = 'admin',
  NON_ADMIN = 2
}

// Union type
type Combinable = number | string;
type Gender = 'f' | 'm';

// Intersection type

class class1 {
  number: number;
}

class class2 {
  string: string;
}

type numberString = class1 & class2;

function test(t: numberString) {
  console.log(t.number);
  console.log(t.string);
}

// object
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: Role;
  desc: Combinable;
  gender: Gender;
} = {
  name: 'test',
  age: 23,
  hobbies: ['a', 'b'],
  role: Role.ADMIN,
  desc: 5,
  gender: 'f'
};

// tuples

var employee: [number, string] = [1, 'Steve'];
var employeeArray: [number, string][];
employeeArray = [
  [1, 'Steve'],
  [2, 'Bill'],
  [3, 'Jeff']
];

// modules

import { Student } from './classes'; // import * from './classes'
let student = new Student(1, 'test');

// Casting

let foo : any = 4;
console.log((<number>foo).toString());
console.log((foo as number).toString());

// Map

let map = new Map();  
  
map.set('1', 'abhishek'); 

//Iterate over map keys  
for (let key of map.keys()) {  
  console.log("Map Keys= " +key);          
}  
//Iterate over map values  
for (let value of map.values()) {  
  console.log("Map Values= " +value);      
}  
console.log("The Map Enteries are: ");   
//Iterate over map entries  
for (let entry of map.entries()) {  
  console.log(entry[0], entry[1]);   
}  

// Set

let studentEntries = new Set();  
   
//Chaining of add() method is allowed in TypeScript  
studentEntries.add("John").add("Peter").add("Gayle").add("Kohli");  

// Date

let date: Date = new Date("2020-01-12");  

  export function logToConsole() {console.log("") }