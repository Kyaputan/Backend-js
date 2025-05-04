"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Duck_1 = require("./Duck");
const foo_1 = require("./foo");
const sum_1 = require("./sum");
var mag = "John doe";
function greet(name) {
    return `Hello, ${name}!`;
}
let person = {
    name: "John Doe",
    age: 30,
    address: "123 Main St",
};
let duck = new Duck_1.Duck();
let blackDuck = new Duck_1.BlackDuck();
console.log(duck.swim()); // Output: fus fus!
console.log(blackDuck.swim()); // Output: Black duck swimming!
console.log(`${(0, foo_1.foo)(person.name)} he is ${person.age} year old live at ${person.address}`); // Output: John Doe
console.log((0, sum_1.sum)(1, 2));
console.log(greet(mag));
console.log((0, foo_1.foo)(mag));
