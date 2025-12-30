// ╔══════════════════════════════════════════════════════════════════════╗
// ║ EXERCÍCIO 3: DIFÍCIL (Classes, Implements e Index Signatures)       ║
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

   async createNewUser(): Promise<User> {
      const userName = await rl.question("Insira o nome do novo usuário: ");
      
      const newUser: User = {
         id: Math.floor(100000 + Math.random() * 900000),
         name: userName,
         createdAt: new Date(),
         borrowedBooks: []
      };

      this.addUser(newUser);
      return newUser;
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

