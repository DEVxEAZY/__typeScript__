// ╔══════════════════════════════════════════════════════════════════════╗
// ║ OBRIGATÓRIO: LER O CONTEXTO ANTES DE COMEÇAR O EXERCÍCIO             ║
// ║ EXERCÍCIO 3: DIFÍCIL (Classes, Implements e Index Signatures)        ║
// ╚══════════════════════════════════════════════════════════════════════╝

/*
  CONTEXTO: Sistema de Biblioteca
  
  OBJETIVO:
  1. Crie uma interface 'Book' que tenha:
     - readonly isbn: string
     - title: string
     - [extraInfo: string]: any (Assinatura de índice para informações variadas)

  2. Crie uma interface 'LibraryAction' que defina um método:
     - borrowBook(book: Book): void

  3. Crie uma classe 'Member' que implemente (implements) 'LibraryAction'.
     A classe deve ter:
     - name: string
     - borrowedBooks: (Book & { borrowedAt: Date })[] 
     - O método 'borrowBook' deve adicionar um NOVO objeto ao array 'borrowedBooks'.
       Esse objeto deve conter todas as propriedades do 'book' original MAIS 
       a propriedade 'borrowedAt' com a data atual. 
       LÓGICA: Use o spread operator (...) para clonar as propriedades do livro 
       e estendê-lo com a data, mantendo a imutabilidade do objeto original.

  4. Crie um livro com informações extras (ex: 'edition', 'author') usando a 
     flexibilidade da assinatura de índice.
*/

// --- DIGITE SEU CÓDIGO ABAIXO ---

import * as readline from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';
import { notStrictEqual } from 'node:assert';

const rl = readline.createInterface({input, output});


interface Book {
   readonly isbn: string;
   title: string;
   [extraInfo: string]: any;
   status: "available" | "unavailable" | "borrowed";
   qtd: number;
}
 
interface User {
   readonly id: number;
   name: string;
   createdAt: Date;
   borrowedBooks: (Book & { borrowedAt: Date })[];
}

interface LibraryAction {
   borrowBook(book: Book): void;
}

class Library {

   books: Book[] = [];
   users: User[] = [];

   async createNewUser(verbose: boolean = false): Promise<User> {
      let userName = ""; // Declaramos aqui fora para o TypeScript não reclamar depois
   
      while (true) {
         userName = await rl.question("Insira o nome de usuário: ");
         // O sinal de '+' tenta converter a string em número. 
         // Se der 'NaN' (Not a Number), o isNaN vira 'true' e sai do loop.
         if (userName.length > 0 && isNaN(+userName)) {
            break;
         }
   
         console.log("Erro: O nome não pode ser composto apenas por números.");
      }

      const newUser: User = {
         id : Math.floor(100000 + Math.random() * 900000),
         name: userName,
         createdAt: new Date(),
         borrowedBooks: []
      }

      if (verbose == true){
         console.log(`Usuário ${newUser.name} criado co  sucesso, ID: ${newUser.id}`)
         this.addUser(newUser);
         return newUser
      }
      else{
         this.addUser(newUser);
         return newUser
      }
   }

   async removeUser(): Promise<User[] | undefined> {
      const getUserId = await rl.question("Informe o ID do usuário que você deseja remover: ");
      const userId = Number(getUserId); 

      const user = this.users.find(u => u.id === userId);

      if (!user) {
         console.log(`Usuário com ID ${userId} não encontrado.`);
         return undefined;
      }

      console.log(`Usuário ID: ${user.id} Nome: ${user.name} encontrado`);
      const confirmation = await rl.question("Deseja prosseguir com a exclusão [y]/[n] ? ");

      if (confirmation.toLowerCase() === "y") {
         this.users = this.users.filter(u => u.id !== userId);
         console.log(`Usuário ${user.name} excluído com sucesso.`);
         return this.users;
      } 
      
      console.log("Exclusão cancelada!");
      return undefined;
   }

   addUser(user: User): void{
      this.users.push(user);
      console.log(`Usuário ${user.name} adicionado com sucesso (ID: ${user.id})`);
   }

   addBook(book: Book): void {
      this.books.push(book);
      console.log(`Livro "${book.title}" adicionado ao acervo.`);
   }

   // Usando o tipo indexado Book["isbn"] como discutimos!
   borrowByIsbn(isbn: Book["isbn"], userId: User["id"]): Book | undefined {
      const book = this.books.find(b => b.isbn === isbn);
      const user = this.users.find(u => u.id === userId);
      if (book && book.status === "available" && user) {
         user.borrowedBooks.push({...book, borrowedAt: new Date()})


         book.status = "borrowed";
         console.log(`Livro "${book.title}" emprestado com sucesso.`);
         return book;

      }
      console.log(`Livro "${book?.title}" não encontrado ou indisponível.`);
      return undefined;
   }

   returnBookIsbn(isbn: Book["isbn"], userId: User["id"]): Book | undefined {
      const book = this.books.find(b => b.isbn === isbn); // só bate o id com o da lista de livros OK
      const user = this.users.find(u => u.id === userId);
      const idRemove = isbn
      const hasBook = user?.borrowedBooks.some(b => b.isbn === isbn)

      // certo até aqui é extraído a indentificação do que quero remver
      // tenho o [isbn] e o [id]

      if (book && user && hasBook) // aqui diz se o status do libro estiver como emprestado
      // e tiver com o usuário posso executar a ação de removação
      {
         user.borrowedBooks = user.borrowedBooks.filter(idForRemove => idForRemove.isbn !== idRemove)
         book.status = "available";
         console.log(`Livro "${book.title}" devolvido com sucesso e agora disponível.`);
         return book;
      }
      console.log(`Livro "${book?.title}" não pertecende aos registros da biblicoteca`);
      return undefined;
   }
}

const biblicotecaPC = new Library();


const optionMenu: {number: 1, option: "Cadastrar Livro"} | {number: 2, option: "Cadastrar Usuário"} | {number: 3, option: "Emprestar Livro"} | {number: 4, option: "Devolver Livro"} | {number: 5, option: "Sair"} = {
   number: 1,
   option: "Cadastrar Livro"
}


console.clear();
console.log(`
╔════════════════════════════════════════════════════════════════╗
║                BEM-VINDO À ADMINISTRAÇÃO DA                    ║
║                           BIBLIOTECA                           ║
╠════════════════════════════════════════════════════════════════╣
║ Aqui você pode gerenciar seu estoque de livros, acompanhar     ║
║ os empréstimos e controlar as devoluções de forma fácil e      ║
║ organizada!                                                    ║
╚════════════════════════════════════════════════════════════════╝
`);


// TODO: Definição das opções do menu como uma constante literal (read-only).
// O 'as const' informa ao TypeScript que os valores de 'id' são fixos (1, 2, 3, 4, 5), não apenas 'number'.
const menuOptions = [
   {id: 1, option: "Cadastrar Livro"},
   {id: 2, option: "Cadastrar Usuário"},
   {id: 3, option: "Emprestar Livro"},
   {id: 4, option: "Devolver Livro"},
   {id: 5, option: "Sair"},   
] as const;

// Relaciona os IDs do array acima com um tipo. Se adicionarmos o ID 6 no array, MenuID atualizará automaticamente.
type MenuID = typeof menuOptions[number]["id"];

// Loop principal do sistema para manter o programa rodando até que a opção 'Sair' seja escolhida.
while (true){

   // Transforma o array de objetos em uma string formatada para exibição no terminal.
   const menuText = menuOptions.map(opt => `${opt.id} - ${opt.option}`).join("\n    ");

   // Captura a entrada do usuário. O 'await' é necessário pois rl.question é assíncrona.
   const input = await rl.question(`\n Selecione uma opção:\n ${menuText}\n   `);
   
   // Converte a string digitada para número e faz o "casting" para MenuID para habilitar o IntelliSense no switch.
   const choice = Number(input) as MenuID;

   switch (choice) {
      case 1:
         // Coleta dados para criar um objeto que satisfaça a interface 'Book' (definida na linha 41).
         console.log("\n--- Cadastro de Livro ---");
         const isbn = await rl.question("ISBN: ");
         const title = await rl.question("Título: ");
         const author = await rl.question("Autor: ");
         const qtd = Number(await rl.question("Quantidade: "));
         
         // Chama o método 'addBook' da classe Library (linha 126).
         biblicotecaPC.addBook({
            isbn, 
            title, 
            author, 
            qtd, 
            status: "available"
         });
         break;

      case 2:
         // Chama o método assíncrono 'createNewUser' da classe Library (linha 65).
         console.log("\n--- Cadastro de Usuário ---");
         await biblicotecaPC.createNewUser(true);
         break;

      case 3:
         // Coleta informações para realizar o empréstimo vinculando um Livro a um Usuário.
         console.log("\n--- Empréstimo de Livro ---");
         const isbnBorrow = await rl.question("ISBN do livro: ");
         const userIdBorrow = Number(await rl.question("ID do usuário: "));
         // Chama o método 'borrowByIsbn' (linha 132) que gerencia a lógica de disponibilidade.
         biblicotecaPC.borrowByIsbn(isbnBorrow, userIdBorrow);
         break;

      case 4:
         // Coleta informações para devolver um livro e atualizar o status para 'available'.
         console.log("\n--- Devolução de Livro ---");
         const isbnReturn = await rl.question("ISBN do livro: ");
         const userIdReturn = Number(await rl.question("ID do usuário: "));
         // Chama o método 'returnBookIsbn' (linha 148) que remove o livro da lista do usuário.
         biblicotecaPC.returnBookIsbn(isbnReturn, userIdReturn);
         break;

      case 5:
         // Finaliza o processo do Node.js.
         console.log("Tchau!");
         process.exit();

      default:
         // Caso o usuário digite algo fora do esperado (como '9' ou letras).
         console.log("Opção inválida!");
         break;
   }
}


// --- RESULTADO ESPERADO ---
/*
  const myLibrary = new Member("Will");
  const basicBook: Book = { 
    isbn: "123-456", 
    title: "TypeScript Mastery",
    author: "Anders Hejlsberg", // Propriedade extra
    year: 2024                // Outra propriedade extra
  };

  myLibrary.borrowBook(basicBook);
  console.log(myLibrary.borrowedBooks.length); // 1
  console.log(myLibrary.borrowedBooks[0].borrowedAt instanceof Date); // true
  console.log(myLibrary.borrowedBooks[0].title); // "TypeScript Mastery"
*/

