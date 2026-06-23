/**
 * GENERIC TYPES (Tipos Genéricos) em TypeScript
 *
 * São "placeholders" de tipo que permitem criar funções, classes e interfaces
 * reutilizáveis que trabalham com QUALQUER tipo, mantendo a segurança de tipos.
 */

// ============================================================================
// POR QUE USAR GENERICS?
// ============================================================================
// - Evitar código duplicado (DRY)
// - Manter type-safety sem perder flexibilidade
// - Inferência automática de tipos na maioria dos casos
// - APIs e utilitários reutilizáveis

// ============================================================================
// QUANDO USAR GENERICS?
// ============================================================================
// - Funções/componentes que lidam com múltiplos tipos da mesma forma
// - Estruturas de dados (Array, Map, Set personalizados)
// - APIs que retornam dados em formato genérico
// - Quando você usa `any` demais e quer type-safety de volta

// ============================================================================
// 1. FUNÇÃO GENÉRICA SIMPLES
// ============================================================================

/** Sem generic: retorna any, perde type-safety */
function identityAny(value: any): any {
  return value;
}

/** Com generic: preserva o tipo na entrada E na saída */
function identity<T>(value: T): T {
  return value;
}

const num = identity(42);        // number
const str = identity("hello");   // string
const obj = identity({ id: 1 }); // { id: number }

// ============================================================================
// 2. MÚLTIPLOS PARÂMETROS DE TIPO
// ============================================================================

function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p1 = pair("nome", 25);           // [string, number]
const p2 = pair(true, [1, 2, 3]);      // [boolean, number[]]

// ============================================================================
// 3. GENERICS EM ARRAYS - FUNÇÕES DE UTILIDADE
// ============================================================================

function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

function lastElement<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

const nums = [1, 2, 3];
const first = firstElement(nums);  // number | undefined
const last = lastElement(nums);    // number | undefined

const names = ["Ana", "Beto", "Carlos"];
const firstName = firstElement(names);  // string | undefined

// ============================================================================
// 4. CONSTRAINTS (RESTRIÇÕES) - extends
// ============================================================================

/** Garante que T tenha a propriedade length */
function logLength<T extends { length: number }>(arg: T): T {
  console.log(`Comprimento: ${arg.length}`);
  return arg;
}

logLength([1, 2, 3]);       // OK - array tem length
logLength("hello");         // OK - string tem length
logLength({ length: 10 });  // OK - objeto com length
// logLength(123);          // ERRO - number não tem length

/** Garante que key exista em T */
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const usuario = { nome: "João", idade: 30 };
const nome = getProp(usuario, "nome");   // string
const idade = getProp(usuario, "idade"); // number
// getProp(usuario, "email");  // ERRO - "email" não existe em usuario

// ============================================================================
// 5. INTERFACE GENÉRICA
// ============================================================================

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: "1", name: "Maria", email: "maria@email.com" },
  status: 200,
  message: "OK",
};

const usersResponse: ApiResponse<User[]> = {
  data: [
    { id: "1", name: "Maria", email: "maria@email.com" },
    { id: "2", name: "Pedro", email: "pedro@email.com" },
  ],
  status: 200,
  message: "OK",
};

// ============================================================================
// 6. CLASSE GENÉRICA
// ============================================================================

class Caixa<T> {
  private conteudo: T;

  constructor(valor: T) {
    this.conteudo = valor;
  }

  getValor(): T {
    return this.conteudo;
  }

  setValor(valor: T): void {
    this.conteudo = valor;
  }
}

const caixaNum = new Caixa<number>(100);
const caixaStr = new Caixa<string>("texto");
const caixaObj = new Caixa<{ x: number }>({ x: 10 });

// ============================================================================
// 7. GENERIC COM VALOR PADRÃO
// ============================================================================

interface Config<T = string> {
  key: string;
  value: T;
}

const config1: Config = { key: "theme", value: "dark" };           // T = string
const config2: Config<number> = { key: "maxRetries", value: 3 };   // T = number
const config3: Config<boolean> = { key: "enabled", value: true };    // T = boolean

// ============================================================================
// 8. MÉTODO GENÉRICO EM CLASSE
// ============================================================================

class Repositorio<T> {
  private itens: T[] = [];

  adicionar(item: T): void {
    this.itens.push(item);
  }

  buscar(predicado: (item: T) => boolean): T | undefined {
    return this.itens.find(predicado);
  }

  todos(): T[] {
    return [...this.itens];
  }
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

const repo = new Repositorio<Produto>();
repo.adicionar({ id: 1, nome: "Notebook", preco: 3000 });
repo.adicionar({ id: 2, nome: "Mouse", preco: 80 });

const caro = repo.buscar((p) => p.preco > 100);  // Produto | undefined

// ============================================================================
// 9. TIPOS CONDICIONAIS COM GENERICS
// ============================================================================

type IsArray<T> = T extends any[] ? "array" : "not-array";

type A = IsArray<number[]>;   // "array"
type B = IsArray<string>;     // "not-array"

// ============================================================================
// 10. UTILITY TYPES COMUNS (já existem no TS, mas usam generics internamente)
// ============================================================================

// Partial<T> - torna todas as props opcionais
// Required<T> - torna todas as props obrigatórias
// Pick<T, K> - pega apenas as chaves K de T
// Omit<T, K> - remove as chaves K de T
// Record<K, V> - objeto com chaves K e valores V

type UsuarioParcial = Partial<User>;
type ApenasNome = Pick<User, "name" | "email">;
type SemEmail = Omit<User, "email">;

// ============================================================================
// EXEMPLO PRÁTICO: WRAPPER DE API GENÉRICO
// ============================================================================

async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  const json = await response.json();
  return json as ApiResponse<T>;
}

// Uso (imaginário - sem fetch real):
// const dados = await fetchApi<User[]>("/api/users");
// dados.data  -> User[]  (TypeScript sabe o tipo!)

// ============================================================================
// RESUMO RÁPIDO
// ============================================================================
// <T>           -> parâmetro de tipo
// T extends U   -> T deve ser compatível com U
// keyof T       -> união de todas as chaves de T
// T[K]          -> tipo do valor da propriedade K em T
