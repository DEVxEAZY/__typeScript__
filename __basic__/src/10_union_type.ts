// =============================================================================
// TRILHA DE APRENDIZADO: UNION TYPES (|)
// =============================================================================

import { readFile } from "node:fs/promises";
import { inflate } from "node:zlib";

// -----------------------------------------------------------------------------
// 1. CONCEITO BÁSICO: Union Types com Primitivos
// O nível mais simples: permitir que um valor pertença a mais de um tipo.
// -----------------------------------------------------------------------------
type Primitivos = string | number | boolean | null | undefined;

let exemplo: Primitivos;
exemplo = "Olá";
exemplo = 10;
exemplo = true;

// -----------------------------------------------------------------------------
// 2. VALORES ESPECÍFICOS: Union de Literais
// Restringe a variável a valores exatos, não apenas ao tipo geral.
// -----------------------------------------------------------------------------

// Exemplo: Temas do Sistema
type Tema = "claro" | "escuro" | "sistema";

function aplicarTema(tema: Tema) {
    console.log(`Aplicando tema: ${tema}`);
}

aplicarTema("claro");
// aplicarTema("azul"); // Erro: "azul" não faz parte da união Tema

// Exemplo: Status de Resposta (Misturando strings e números)
type Status = "not found" | 404 | "OK" | 200 | "forbidden" | 403;

function logStatus(status: Status) {
    console.log(`Status: ${status}`);
}

// -----------------------------------------------------------------------------
// 3. COMO USAR: Type Narrowing (Estreitamento de Tipos)
// Como o TS nos deixa acessar métodos específicos após verificar o tipo.
// -----------------------------------------------------------------------------

export function processarValor(valor: Primitivos) {
    // A) Usando typeof (Narrowing)
    if (typeof valor === "string") {
        return valor.toUpperCase(); // Aqui o TS sabe que é string
    }

    if (typeof valor === "number") {
        return valor.toFixed(2); // Aqui o TS sabe que é number
    }

    if (typeof valor === "boolean") {
        return valor ? "Verdadeiro" : "Falso";
    }

    return "Sem valor definido (null/undefined)";
}

// -----------------------------------------------------------------------------
// 4. PADRÃO AVANÇADO: Discriminated Unions (Uniões Discriminadas)
// O padrão recomendado para objetos. Usa uma propriedade comum para "diferenciar".
// -----------------------------------------------------------------------------

// Exemplo: Resultado de Login
interface LoginSucesso {
    tipo: "sucesso"; // Propriedade discriminante
    usuario: string;
    token: string;
}

interface LoginErro {
    tipo: "erro";
    codigo: number;
    mensagem: string;
}

type ResultadoLogin = LoginSucesso | LoginErro;

function responderLogin(resultado: ResultadoLogin) {
    // O narrowing acontece automaticamente ao verificar a propriedade 'tipo'
    if (resultado.tipo === "sucesso") {
        console.log(`Bem-vindo ${resultado.usuario}, token: ${resultado.token}`);
    } else {
        console.log(`Erro ${resultado.codigo}: ${resultado.mensagem}`);
    }
}

// Exemplo: Semáforo com Enum
enum TrafficLightType { Red, Green, Yellow }

interface YellowColor { type: TrafficLightType.Yellow; wait(): void; }
interface RedColor { type: TrafficLightType.Red; stop(): void; }
interface GreenColor { type: TrafficLightType.Green; go(): void; }

type TrafficLight = YellowColor | RedColor | GreenColor;

const sinal: TrafficLight = {
    type: TrafficLightType.Red,
    stop(): void { console.log("Pare!"); }
};

// -----------------------------------------------------------------------------
// 5. SEGURANÇA TOTAL: Exhaustiveness Checking
// Usando o tipo 'never' para garantir que TODOS os casos foram tratados.
// -----------------------------------------------------------------------------

type Operacao = "somar" | "subtrair" | "multiplicar";

function calcular(a: number, b: number, operacao: Operacao): number {
    switch (operacao) {
        case "somar": return a + b;
        case "subtrair": return a - b;
        case "multiplicar": return a * b;
        default:
            // Se você adicionar "dividir" em 'Operacao' e esquecer aqui, 
            // esta linha abaixo dará erro de compilação!
            const _exaustivo: never = operacao;
            return _exaustivo;
    }
}

// -----------------------------------------------------------------------------
// 6. CASOS EXTREMOS: Tipos Recursivos
// Quando um tipo se refere a si mesmo (comum em estruturas como JSON).
// -----------------------------------------------------------------------------

type JSONvalue = string | number | boolean | JSONvalue[] | { [key: string]: JSONvalue };

// Exemplo de uso (Lendo um arquivo JSON real)
const json: JSONvalue = await readFile("10_union_type.json", "utf-8");
