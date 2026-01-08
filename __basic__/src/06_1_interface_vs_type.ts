// ╔══════════════════════════════════════════════════════════════════════╗
// ║ INTERFACE vs TYPE ALIAS: AS DIFERENÇAS REAIS                        ║
// ╚══════════════════════════════════════════════════════════════════════╝

/**
 * 1. DECLARATION MERGING (A maior diferença)
 * Interfaces: Podem ser definidas múltiplas vezes e o TS as une.
 * Types: Não podem ser redefinidos.
 */

interface UserInterface {
    name: string;
}

interface UserInterface {
    age: number;
}

// O objeto 'user' PRECISA ter name e age.
const user: UserInterface = {
    name: "Will",
    age: 30
};

type UserType = {
    name: string;
};

// type UserType = { age: number }; // ❌ Erro: Duplicate identifier 'UserType'


/**
 * 2. TIPOS PRIMITIVOS E UNIÕES
 * Types: Podem renomear primitivos e criar uniões/tuplas.
 * Interfaces: São estritamente para formas de Objetos.
 */

type ID = string | number; // ✅ OK
type Color = "red" | "blue" | "green"; // ✅ OK (Union Type)
type Point = [number, number]; // ✅ OK (Tupla)

// interface ID extends string | number {} // ❌ Erro: Não funciona


/**
 * 3. EXTENSÃO (SINTAXE)
 * Interfaces: Usam a palavra-chave 'extends'.
 * Types: Usam o operador de interseção '&'.
 */

interface AnimalInterface {
    name: string;
}

interface DogInterface extends AnimalInterface {
    bark(): void;
}

type AnimalType = {
    name: string;
};

type DogType = AnimalType & {
    bark(): void;
};


/**
 * 4. CLASSES (IMPLEMENTS)
 * Ambos podem ser usados em classes, mas interfaces são o padrão da indústria.
 */

class MyDog implements DogInterface {
    name = "Rex";
    bark() { console.log("Au!"); }
}

class MyOtherDog implements DogType {
    name = "Bob";
    bark() { console.log("Au!"); }
}


/**
 * 5. QUANDO USAR QUAL?
 * 
 * Use INTERFACE para:
 * - Definir a estrutura de um objeto que pode ser estendido (ex: bibliotecas).
 * - Quando você quer aproveitar o Declaration Merging.
 * - Classes e POOs.
 * 
 * Use TYPE para:
 * - Uniões (A | B).
 * - Interseções complexas (&).
 * - Tipos utilitários (Mapped Types, Conditional Types).
 * - Aliases para tipos primitivos.
 */

