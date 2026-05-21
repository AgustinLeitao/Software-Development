"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role[Role["NON_ADMIN"] = 2] = "NON_ADMIN";
})(Role || (Role = {}));
// Intersection type
class class1 {
}
class class2 {
}
function test(t) {
    console.log(t.number);
    console.log(t.string);
}
// object
const person = {
    name: 'test',
    age: 23,
    hobbies: ['a', 'b'],
    role: Role.ADMIN,
    desc: 5,
    gender: 'f'
};
// tuples
var employee = [1, 'Steve'];
var employeeArray;
employeeArray = [
    [1, 'Steve'],
    [2, 'Bill'],
    [3, 'Jeff']
];
// modules
const classes_1 = require("./classes"); // import * from './classes'
let student = new classes_1.Student(1, 'test');
// Casting
let foo = 4;
console.log(foo.toString());
console.log(foo.toString());
// Map
let map = new Map();
map.set('1', 'abhishek');
//Iterate over map keys  
for (let key of map.keys()) {
    console.log("Map Keys= " + key);
}
//Iterate over map values  
for (let value of map.values()) {
    console.log("Map Values= " + value);
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
let date = new Date("2020-01-12");
//# sourceMappingURL=objects.js.map