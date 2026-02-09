/**
 * ENUMS (Enumerações) no TypeScript
 * 
 * O que são?
 * Enums permitem definir um conjunto de constantes nomeadas. 
 * Elas facilitam a criação de um conjunto de valores que podem ser referenciados por nomes amigáveis,
 * tornando o código mais legível e menos propenso a erros (evitando "números mágicos" ou strings soltas).
 */

// 1. Enum Numérico (Comportamento padrão)
// Por padrão, o primeiro valor começa em 0 e os demais são incrementados automaticamente.
enum DiasDaSemana {
    Domingo,    // 0
    Segunda,    // 1
    Terca,      // 2
    Quarta,     // 3
    Quinta,     // 4
    Sexta,      // 5
    Sabado      // 6
}

let hoje: DiasDaSemana = DiasDaSemana.Quarta;
console.log(`Hoje é o dia de índice: ${hoje}`); // Saída: 3

// 2. Enum Numérico com Inicializador
// Podemos definir o valor inicial e os próximos seguirão a sequência.
enum StatusPedido {
    Pendente = 1,
    Processando, // 2
    Enviado,     // 3
    Entregue     // 4
}

let statusAtual = StatusPedido.Enviado;
console.log(`Status do pedido: ${statusAtual}`); // Saída: 3

// 3. Enum de String
// Úteis quando os valores precisam ter um significado textual claro na depuração/logs.
enum Direcao {
    Norte = "NORTH",
    Sul = "SOUTH",
    Leste = "EAST",
    Oeste = "WEST"
}

let paraOndeVou: Direcao = Direcao.Norte;
console.log(`Indo para: ${paraOndeVou}`); // Saída: "NORTH"

// 4. Por que usar Enums?
// - Legibilidade: 'StatusPedido.Entregue' é mais claro que o número 4.
// - Segurança de Tipos: O TS garante que você use apenas valores definidos no Enum.
// - Facilidade de Manutenção: Se o valor mudar, você altera apenas no Enum.

function atualizarStatus(novoStatus: StatusPedido) {
    console.log(`Atualizando para: ${novoStatus}`);
}

atualizarStatus(StatusPedido.Processando);
// atualizarStatus(10); // Erro de compilação (dependendo da versão/config do TS, mas idealmente evita)

// 5. Diferença Visual no JS Gerado
// Enums numéricos permitem "Reverse Mapping" (Mapeamento Reverso)
console.log(StatusPedido[3]); // Saída: "Enviado" (Apenas para enums numéricos!)
// console.log(Direcao["NORTH"]); // Não funciona para Enums de String

/**
 * RESUMO:
 * Use Enums quando você tiver um conjunto fixo de valores relacionados.
 * - Use numéricos para lógica interna simples.
 * - Use strings quando o valor literal for importante para logs ou APIs externas.
 */
