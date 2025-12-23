# Type Annotations no TypeScript

Type annotations permitem que você especifique explicitamente o tipo de uma variável, parâmetro de função, retorno, etc. Isso traz maior segurança, já que o TypeScript consegue apontar inconsistências e erros em tempo de desenvolvimento.

## Principais Exemplos de Anotações de Tipo

### Tipos primitivos

```ts
const myName: string = "John";
const myAge: number = 30;
const isStudent: boolean = false;
```

### Null e Undefined como tipos primitivos

```ts
let u: undefined = undefined;
let n: null = null;
```

### Arrays

```ts
const hobbies: string[] = ["reading", "sports"];
const scores: Array<number> = [98, 87, 75];
```
Você pode anotar arrays de duas maneiras: `tipo[]` ou `Array<tipo>`.

### Tupla

Uma tupla permite definir exatamente quantos e quais tipos de valores seu array terá.

```ts
const person: [string, number] = ["Alice", 25];
```

### Enum

Enumerações são úteis para definir um conjunto de constantes nomeadas:

```ts
enum Color {
    Red,
    Green,
    Blue
}
const favoriteColor: Color = Color.Green;
```

### Any

O tipo `any` desativa a verificação de tipo, aceitando qualquer valor (use com cautela):

```ts
let randomValue: any = "Can be any type";
randomValue = 42;
```

### Void

Funções que não retornam valor usam `void`:

```ts
function greet(name: string): void {
    console.log(`Hello, ${name}`);
}
```

### Never

Use `never` para funções que **nunca retornam**, como as que sempre lançam erro:

```ts
function throwError(message: string): never {
    throw new Error(message);
}
```

### Tipo Objeto

Você pode anotar objetos explicitando suas propriedades e tipos:

```ts
let user: { name: string, age: number } = {
    name: "Bob",
    age: 22
};
```

### Tipos União

Permitem que uma variável tenha **mais de um tipo possível**:

```ts
let id: number | string = "1234";
id = 5678;
```

### Alias de Tipo

Crie apelidos para tipos, tornando o código mais organizado:

```ts
type Point = {
    x: number;
    y: number;
};
const pointA: Point = { x: 10, y: 20 };
```

---

## Function Types

### Especificando tipos de parâmetros e retorno

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

### Argumentos opcionais

Utilize `?` para argumentos que são opcionais:

```ts
function createUser(name: string, age?: number): { name: string, age?: number } {
    return { name, age };
}
```

### Funções como tipos (Function Types)

Você pode tipar funções atribuídas a variáveis, incluindo parâmetros e tipo de retorno:

```ts
const isGreaterThanThree = (value: number): boolean => {
    return value > 3;
}
```

### Uso comum com métodos de array

```ts
const numbers = [1, 2, 3, 4, 5];
const filteredNumbers = numbers.filter(isGreaterThanThree);
```

---

## Dicas e Complementos

- **Inferência de tipo:** Se você fornecer um valor inicial, o TypeScript pode inferir o tipo automaticamente, então nem sempre é necessário anotar.
- **Reforço de tipos:** O uso de tipos explícitos ajuda a prevenir bugs e torna o código mais legível e seguro.
- **Objetos mais complexos:** Para objetos ou funções com muitos tipos, prefira usar `type` ou `interface` para facilitar manutenção.

---

## Resumo

- Use **type annotations** para explicitar e documentar seus tipos, melhorando a segurança do seu código.
- Combine alias (`type`, `interface`), tipos primitivos, união, tupla e funções sempre que necessário.
- Prefira ser explícito em funções públicas e em APIs externas.

> TypeScript é sobre clareza, comunicação e confiabilidade no seu código JavaScript!

