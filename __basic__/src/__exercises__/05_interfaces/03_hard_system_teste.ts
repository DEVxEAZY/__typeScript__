// ╔══════════════════════════════════════════════════════════════════════╗
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

