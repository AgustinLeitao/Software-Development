"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
class Student {
    constructor(code, name) {
        this.studCode = code;
        this.studName = name;
    }
    static staticMethod() {
        return 20;
    }
}
exports.Student = Student;
Student.hash = 'aw2091665434';
class Person extends Student {
    constructor(code, name, department) {
        super(code, name);
        this.department = department;
    }
    set deparment(newDeparment) {
        this.deparment = newDeparment;
    }
    get deparment() {
        return this.deparment;
    }
    getElevatorPitch() {
        return `My unique code: ${this.studCode}, my name: ${this.studName} and I am in ${this.department} Branch.`;
    }
}
let joeRoot = new Person(1, 'JoeRoot', 'CS');
console.log(joeRoot.getElevatorPitch());
joeRoot.deparment = 'new Department';
console.log(joeRoot.deparment);
class Animal {
}
class Dog extends Animal {
    walk() {
        return console.log('walking...');
    }
}
const dog1 = new Dog();
dog1.walk();
// dog1.run(); run() is not accesible due to it being protected.
//# sourceMappingURL=classes.js.map