// Named function

function add(n1: number, n2: number): number {
  return n1 + n2;
}

console.log(add(1, 2));

// Function overload

function addOverload(a: string, b: string): string;

function addOverload(a: number, b: number): number;

function addOverload(a: any, b: any): any {
  // This one must have the implementation.
  return a + b;
}

// Anonymous function

const addAnonymous = function(n1: number, n2: number): number {
  return n1 + n2;
};

console.log(addAnonymous(1, 2));

// Arrow function

let addArrow = (a: number, b: number, c: number = 10): number => a + b + c;

console.log(addArrow(1, 2));

// Rest parameters

function Greet(greeting: string, ...names: string[]) {
  return greeting + ' ' + names.join(', ') + '!';
}

Greet('Hello', 'Steve', 'Bill'); // returns "Hello Steve, Bill!"

Greet('Hello'); // returns "Hello !"
