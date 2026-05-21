function f() {
  console.log('f(): evaluated');
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(`f(): called.`);
    console.dir(target);
    console.dir(propertyKey);
    console.dir(descriptor);
  };
}

function g() {
  console.log('g(): evaluated');
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(`g(): called.`);
    console.dir(target);
    console.dir(propertyKey);
    console.dir(descriptor);
  };
}

class C {
  @f()
  @g()
  method() {
    console.log('method gets executed');
  }
}

// decorator gets executed after the constructor
function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = 'new property';
    hello = 'override';
  };
}

@classDecorator
class Greeter {
  property = 'property';
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}

console.log(new Greeter('world'));
