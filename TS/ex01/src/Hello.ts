import { Duck, BlackDuck } from "./Duck";
import { foo } from "./foo";
import { sum } from "./sum";

var mag:string = "John doe";


function greet(name:string):string {
    return `Hello, ${name}!`;
}

type Person = {
    name: string;
    age: number;
    email?: string;
    address?: string;
};

let person: Person = {
    name: "John Doe",
    age: 30,
    address: "123 Main St",
};

let duck: Duck = new Duck();
let blackDuck: BlackDuck = new BlackDuck();

console.log(duck.swim()); // Output: fus fus!
console.log(blackDuck.swim()); // Output: Black duck swimming!

console.log(`${foo(person.name)} he is ${person.age} year old live at ${person.address}`); // Output: John Doe
console.log(sum(1, 2));
console.log(greet(mag));
console.log(foo(mag));