export class Student {
  static hash: string = 'aw2091665434';
  public studCode: number;
  protected studName: string;
  constructor(code: number, name: string) {
    this.studCode = code;
    this.studName = name;
  }

  public static staticMethod(): number {
    return 20;
  }
}
class Person extends Student {
  private department: string;

  constructor(code: number, name: string, department: string) {
    super(code, name);
    this.department = department;
  }

  public set deparment(newDeparment: string) {
    this.deparment = newDeparment;
  }

  public get deparment() {
    return this.deparment;
  }

  public getElevatorPitch() {
    return `My unique code: ${this.studCode}, my name: ${this.studName} and I am in ${this.department} Branch.`;
  }
}

let joeRoot: Person = new Person(1, 'JoeRoot', 'CS');
console.log(joeRoot.getElevatorPitch());
joeRoot.deparment = 'new Department';
console.log(joeRoot.deparment);

abstract class Animal {
  abstract walk(): void;
}

class Dog extends Animal {
  walk(): void {
    return console.log('walking...');
  }
}

const dog1 = new Dog();
dog1.walk();
// dog1.run(); run() is not accesible due to it being protected.
