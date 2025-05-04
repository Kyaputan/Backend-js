// interface = type
// interface used to define the structure of an {object} OOP
// interface PersonInterface {
//     name: string;
//     age: number;
//     email?: string;
//     address?: string;
// }
interface DuckInterface {
    swim(): string;
    quack(): string;
}
;
export class Duck implements DuckInterface {
    public swim(): string {
        return "fus fus!";
    }
    public quack(): string {
        return "Quack!";
    }
}
;
export class BlackDuck extends Duck {
    public swim(): string {
        return "Black duck swimming!";
    }
    public quack(): string {
        return "Black duck quacking!";
    }
}
;
