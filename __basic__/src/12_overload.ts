/**
 * SOBRECARGA DE FUNÇÕES (Function Overloading) em TypeScript
 * 
 * Permite definir várias assinaturas para uma única função, oferecendo 
 * flexibilidade para tratar diferentes tipos e números de argumentos.
 */

// --- Exemplo 1: Sobrecarga simples baseada no Tipo ---

function createDate(value: Date): Date;
function createDate(value: number): Date;
function createDate(value: string): Date;
/**
 * A implementação (última função) deve ser compatível com todas as assinaturas acima.
 */
function createDate(value: Date | number | string): Date {
    if (value instanceof Date) {
        return value;
    }
    return new Date(value);
}

const d1 = createDate(1677024000000); // Passando number
const d2 = createDate("2023-02-22"); // Passando string
const d3 = createDate(new Date());   // Passando Date

console.log("Datas:", { d1, d2, d3 });

// --- Exemplo 2: Diferentes números de argumentos ---

interface User {
    id: string;
    role: "admin" | "user";
}

function findUser(id: string): User;
function findUser(role: "admin" | "user"): User[];
function findUser(query: string): User | User[] {
    if (query === "admin" || query === "user") {
        return [{ id: "1", role: query as any }, { id: "2", role: query as any }];
    }
    return { id: query, role: "user" };
}

const userById = findUser("uuid-123");     // Retorna User
const adminUsers = findUser("admin");       // Retorna User[]

// --- Exemplo 3: Sobrecarga em Classes ---

class Messenger {
    send(message: string): void;
    send(message: string, urgent: boolean): void;
    send(message: string, urgent?: boolean): void {
        console.log(`Enviando: "${message}" ${urgent ? "[URGENTE]" : ""}`);
    }
}

const msg = new Messenger();
msg.send("Olá!");
msg.send("Aviso importante!", true);

// --- Exemplo 4: Sobrecarga com Tipos de Retorno Diferentes ---

interface ErrorResponse { error: string }
interface SuccessResponse<T> { data: T }

function apiResponse(status: "success", data: string): SuccessResponse<string>;
function apiResponse(status: "error", message: string): ErrorResponse;
function apiResponse(status: "success" | "error", payload: string): any {
    if (status === "success") {
        return { data: payload };
    }
    return { error: payload };
}

const ok = apiResponse("success", "Tudo certo!"); // Tipado como SuccessResponse
const fail = apiResponse("error", "Algo falhou.");  // Tipado como ErrorResponse

// ---------------------------------------------------------
// EXERCÍCIO: Implemente uma função 'format' que:
// 1. Receba um número e retorne uma string formatada como "R$ X,XX"
// 2. Receba uma string e retorne essa string em CAIXA ALTA (toUpperCase)
// 3. Receba um array de strings e retorne uma única string concatenada por vírgulas
// ---------------------------------------------------------

/*
function format(value: number): string;
function format(value: string): string;
function format(value: string[]): string;
function format(value: any): string {
    // Implemente a lógica aqui usando typeof ou Array.isArray()
    return "";
}

// Exemplos para teste:
// console.log(format(1500.5));      // "R$ 1500,50"
// console.log(format("typescript")); // "TYPESCRIPT"
// console.log(format(["A", "B"]));   // "A, B"
*/
