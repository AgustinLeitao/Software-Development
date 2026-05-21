let userInput: unknown;
let userName: string; // username = userInput Not valid.

if (typeof userInput === 'string') {
  userName = userInput;
}

function thowError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

function greet(number: number, date : Date) {console.log(`${number}, ${date.toString()}`)};
greet(2, new Date(2,2,2));

var pepe: string = "pepe";
let pepo: number = 2;

const names = ["Alice", "Bob", "Eve"];

function printCoord(pt: { x: number | string, y?: "pepe" | "pepo" | "pepa" }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
  }

  type point = {x: string, y: number}
  type point2 = {z: point}
  interface point3 {a: string}

  const obj = { counter: 0 };
if (true) {
obj.counter = 1;
}

enum colors {blue, red, green}
type colorss = {x: string}

class person { 
  private x: string;

  constructor(x, y) {this.x = x}
}

type greetFunction = (a: string) => number

function greeter<T extends number>(fn: greetFunction, number: T)  {
  return "asd";
}

greeter(a => 2, 2);

function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
  }


function testing({a = 2, b = "asd"} : {a: number, b: string}) : number
 {
return 1;
 }

 class Person2 {
   age: number;

   constructor(age : number) {
     this.age = age;
   }

   get _age() : number {
     return this.age;
   }
 }

 class MyClass {
  [s: string]: boolean | ((s: string) => boolean);
  check(s: string) {
  return this[s] as boolean;
  }
  }

  let example = new MyClass();
  var result = example.check("s")