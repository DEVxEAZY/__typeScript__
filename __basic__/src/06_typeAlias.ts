// ╔══════════════════════════════════════════════════════════════════════╗
// ║ TYPE ALIAS (Apelidos de Tipos)                                       ║
// ╚══════════════════════════════════════════════════════════════════════╝

// O Type Alias permite criar um novo nome para um tipo. 
// Ele é muito flexível e pode representar primitivos, uniões, tuplas, etc.

// 1. Tipos Primitivos
type UUID = string | number;
type UserID = number;

// 2. Objetos com Type Alias
type Dog = {
    name: string;
    breed: string;
    bark(): string;
};

type Cat = {
    name: string;
    breed: string;
    color: string;
    meow(): string;
};

// 3. Union Types (União de Tipos)
// O tipo Animal pode ser OU um Dog OU um Cat
type Animal = Dog | Cat;

function createAnimal(animal: Animal) {
    console.log(`Criando animal: ${animal.name}`);
    
    // Type Guard simples para diferenciar
    if ("bark" in animal) {
        console.log(animal.bark());
    } else if ("meow" in animal) {
        console.log(animal.meow());
    }
}

createAnimal({
    name: "Spike",
    breed: "Bulldog",
    bark: () => "Woof! Woof!"
});

// 4. Intersection Types (Interseção de Tipos)
// Combina múltiplos tipos em um só usando o operador '&'
type Employee = {
    id: number;
    name: string;
};

type Manager = {
    department: string;
    employeesCount: number;
};

// Um TeamLeader tem as propriedades de Employee E de Manager
type TeamLeader = Employee & Manager;

const leader: TeamLeader = {
    id: 1,
    name: "Willian",
    department: "Desenvolvimento",
    employeesCount: 10
};

// 5. Tipos Literais
// Útil para restringir valores a opções específicas
type ThemeMode = "light" | "dark" | "system";
let currentTheme: ThemeMode = "dark"; // OK
// currentTheme = "blue"; // ❌ Erro: "blue" não é permitido

// 6. Tipos de Função
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (x, y) => x + y;
const multiply: MathOperation = (x, y) => x * y;

// 7. Diferença entre Interface e Type Alias (Resumo)
/*
   Interface:
   - Melhor para definir a estrutura de objetos e classes.
   - Suporta 'Declaration Merging' (pode definir a mesma interface várias vezes).
   - Geralmente recomendada para APIs públicas.

   Type Alias:
   - Mais flexível (pode ser primitivo, união, interseção, tupla).
   - Não suporta 'Declaration Merging'.
   - Excelente para tipos complexos e utilitários.
*/

console.log(`Tema atual: ${currentTheme}`);
console.log(`Resultado da soma: ${add(10, 5)}`);
