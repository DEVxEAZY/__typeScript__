// ═══════════════════════════════════════════════════════════════════════
// EXPLICAÇÃO DETALHADA: Arrow Functions como Callbacks
// ═══════════════════════════════════════════════════════════════════════

interface Usuario {
   id: number;
   nome: string;
}

const usuarios: Usuario[] = [
   { id: 1, nome: "João" },
   { id: 2, nome: "Maria" },
   { id: 3, nome: "Pedro" }
];

const userIdProcurado = 2;

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLO 1: Arrow Function com .find()
// ═══════════════════════════════════════════════════════════════════════

// FORMA CONCISA (a que você viu no código):
const usuario1 = usuarios.find(u => u.id === userIdProcurado);
// 'u' é cada elemento do array que o .find() está testando
// '=>' separa o parâmetro do corpo da função
// 'u.id === userIdProcurado' é a condição que retorna true/false

// ═══════════════════════════════════════════════════════════════════════
// EQUIVALÊNCIAS - Todas fazem a mesma coisa:
// ═══════════════════════════════════════════════════════════════════════

// FORMA 2: Com chaves e return explícito
const usuario2 = usuarios.find(u => {
   return u.id === userIdProcurado;
});

// FORMA 3: Função tradicional (sem arrow function)
const usuario3 = usuarios.find(function(u) {
   return u.id === userIdProcurado;
});

// FORMA 4: Função nomeada separada
const buscarPorId = (u: Usuario) => u.id === userIdProcurado;
const usuario4 = usuarios.find(buscarPorId);

// FORMA 5: Usando loop tradicional (equivalente manual)
let usuario5: Usuario | undefined;
for (let u of usuarios) {
   if (u.id === userIdProcurado) {
      usuario5 = u;
      break;
   }
}

// ═══════════════════════════════════════════════════════════════════════
// COMO O .find() FUNCIONA INTERNAMENTE (conceitual):
// ═══════════════════════════════════════════════════════════════════════

/*
   O método .find() faz algo parecido com isso:

   Array.prototype.find = function(callback) {
      for (let i = 0; i < this.length; i++) {
         const elemento = this[i];
         // Chama a função callback passando o elemento atual
         if (callback(elemento)) {  // Se retornar true
            return elemento;        // Retorna esse elemento
         }
      }
      return undefined;  // Se nenhum elemento satisfizer
   }

   Então quando você escreve:
      usuarios.find(u => u.id === userIdProcurado)
   
   O JavaScript faz:
      1. Pega o primeiro elemento: { id: 1, nome: "João" }
      2. Chama: (u => u.id === userIdProcurado)({ id: 1, nome: "João" })
      3. Avalia: 1 === 2 → false
      4. Continua para o próximo elemento
      5. Pega: { id: 2, nome: "Maria" }
      6. Chama: (u => u.id === userIdProcurado)({ id: 2, nome: "Maria" })
      7. Avalia: 2 === 2 → true
      8. Retorna: { id: 2, nome: "Maria" }
*/

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLO 2: Arrow Function com .filter()
// ═══════════════════════════════════════════════════════════════════════

// Remove o usuário com id 2, mantém os outros
const usuariosFiltrados = usuarios.filter(u => u.id !== userIdProcurado);
// Resultado: [{ id: 1, nome: "João" }, { id: 3, nome: "Pedro" }]

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLO 3: Arrow Function com .map()
// ═══════════════════════════════════════════════════════════════════════

// Transforma cada usuário em uma string
const nomes = usuarios.map(u => u.nome);
// Resultado: ["João", "Maria", "Pedro"]

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLO 4: Arrow Function com múltiplos parâmetros
// ═══════════════════════════════════════════════════════════════════════

// .reduce() usa arrow function com 2 parâmetros
const somaIds = usuarios.reduce((acumulador, u) => acumulador + u.id, 0);
// 'acumulador' é o valor acumulado
// 'u' é cada elemento do array
// Resultado: 1 + 2 + 3 = 6

// ═══════════════════════════════════════════════════════════════════════
// REGRAS IMPORTANTES:
// ═══════════════════════════════════════════════════════════════════════

// 1. Se você usa chaves {}, precisa do return explícito:
const exemplo1 = usuarios.find(u => {
   const id = u.id;
   return id === userIdProcurado;  // ← return obrigatório
});

// 2. Se você NÃO usa chaves {}, o return é automático:
const exemplo2 = usuarios.find(u => u.id === userIdProcurado);  // ← return automático

// 3. Se você tem apenas 1 parâmetro, pode omitir os parênteses:
const exemplo3 = usuarios.find(u => u.id === userIdProcurado);  // ✓ OK
const exemplo4 = usuarios.find((u) => u.id === userIdProcurado);  // ✓ Também OK

// 4. Se você tem 0 ou 2+ parâmetros, precisa dos parênteses:
const exemplo5 = usuarios.reduce((acc, u) => acc + u.id, 0);  // ✓ OK
// const exemplo6 = usuarios.reduce(acc, u => acc + u.id, 0);  // ✗ ERRO!

// ═══════════════════════════════════════════════════════════════════════
// RESUMO VISUAL:
// ═══════════════════════════════════════════════════════════════════════

/*
   SINTAXE GERAL:
   ┌─────────┐  ┌──┐  ┌────────────────────┐
   │ (u)     │  │=>│  │ u.id === userId    │
   └─────────┘  └──┘  └────────────────────┘
      ↑          ↑              ↑
   parâmetro   arrow      corpo/retorno
   
   EQUIVALE A:
   function(u) {
      return u.id === userId;
   }
*/

console.log("Usuário encontrado:", usuario1);
console.log("Usuários filtrados:", usuariosFiltrados);
console.log("Nomes:", nomes);
console.log("Soma dos IDs:", somaIds);
