// ╔══════════════════════════════════════════════════════════════════════╗
// ║ TYPE ANNOTATIONS                                                   ║
// ╚══════════════════════════════════════════════════════════════════════╝
/*
NOTA:
    - Type annotations são uma forma de especificar o tipo de uma variável, função, etc.
    - Inferência de tipo: o TypeScript é capaz de inferir o tipo de uma variável com base no valor que ela recebe.
   
*/

// ╔════════════════════════════╗
// ║ Tipos Primitivos          ║
// ╚════════════════════════════╝
const myName: string = "John";
const myAge: number = 30;
const isStudent: boolean = false;

// ╔════════════════════════════════════════╗
// ║ Null e Undefined como tipos primitivos ║
// ╚════════════════════════════════════════╝
let u: undefined = undefined;
let n: null = null;

// ╔══════════════════════════════════╗
// ║ Arrays                          ║
// ╚══════════════════════════════════╝
const hobbies: string[] = ["reading", "sports", "music"];
const scores: Array<number> = [98, 87, 75];

// ╔══════════════════════════════════╗
// ║ Tupla                           ║
// ╚══════════════════════════════════╝
const person: [string, number] = ["Alice", 25];

// ╔══════════════════════════════════╗
// ║ Enum                            ║
// ╚══════════════════════════════════╝
enum Color {
    Red,
    Green,
    Blue
}
const favoriteColor: Color = Color.Green;

// ╔══════════════════════════════════╗
// ║ Any                             ║
// ╚══════════════════════════════════╝
let randomValue: any = "Can be any type";
randomValue = 42;

// ╔══════════════════════════════════╗
// ║ Void                            ║
// ╚══════════════════════════════════╝
function greet(name: string): void {
    console.log(`Hello, ${name}`);
}

// ╔══════════════════════════════════╗
// ║ Never                           ║
// ╚══════════════════════════════════╝
function throwError(message: string): never {
    throw new Error(message);
}

// ╔══════════════════════════════════╗
// ║ Tipo Objeto                     ║
// ╚══════════════════════════════════╝
let user: { name: string, age: number } = {
    name: "Bob",
    age: 22
};

// ╔══════════════════════════════════╗
// ║ Tipos União                     ║
// ╚══════════════════════════════════╝
let id: number | string = "1234";
id = 5678;

// ╔══════════════════════════════════╗
// ║ Alias de Tipo                   ║
// ╚══════════════════════════════════╝
type Point = {
    x: number;
    y: number;
};
const pointA: Point = { x: 10, y: 20 };

// ╔════════════════════════════════════════╗
// ║ FUNCTION TYPES                        ║
// ╚════════════════════════════════════════╝

// ╔═══════════════════════════════════════════════════╗
// ║ Exemplo 1: Especificando tipo no retorno da função║
// ╚═══════════════════════════════════════════════════╝
function add(a: number, b: number): number {
    return a + b;
}

// ╔═══════════════════════════════════════════════════╗
// ║ Exemplo 2: Argumentos opcionais em funções        ║
// ╚═══════════════════════════════════════════════════╝
function createUser(name: string, age?: number): { name: string, age?: number } {
    return { name, age };
}

// ╔════════════════════════════════════════╗
// ║ Encaixando valores                     ║
// ╚════════════════════════════════════════╝


const isGreaterThanThree = (value: number): boolean => {
    return value > 3;
}

const numbers = [1, 2, 3, 4, 5];



const filteredNumbers = numbers.filter(isGreaterThanThree);

console.log(filteredNumbers);