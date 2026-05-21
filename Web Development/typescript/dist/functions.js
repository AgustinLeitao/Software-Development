"use strict";
// Named function
function add(n1, n2) {
    return n1 + n2;
}
console.log(add(1, 2));
function addOverload(a, b) {
    // This one must have the implementation.
    return a + b;
}
// Anonymous function
const addAnonymous = function (n1, n2) {
    return n1 + n2;
};
console.log(addAnonymous(1, 2));
// Arrow function
let addArrow = (a, b, c = 10) => a + b + c;
console.log(addArrow(1, 2));
// Rest parameters
function Greet(greeting, ...names) {
    return greeting + ' ' + names.join(', ') + '!';
}
Greet('Hello', 'Steve', 'Bill'); // returns "Hello Steve, Bill!"
Greet('Hello'); // returns "Hello !"
//# sourceMappingURL=functions.js.map