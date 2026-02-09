import * as readline from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';
import { notStrictEqual } from 'node:assert';
import { BlobOptions } from 'node:buffer';
import { setMaxListeners } from 'node:cluster';
import { get } from 'node:http';
import { normalize } from 'node:path';
import fs from 'node:fs';
import path from 'node:path';

const data_path = path.join(__dirname, 'cache' , 'data.json');
const data = JSON.parse(fs.readFileSync(data_path, 'utf8'));

function saveData(data: any){

   const cacheDir = path.dirname(data_path);
   if(!fs.existsSync(cacheDir)){
      fs.mkdirSync(cacheDir, {recursive: true});
   }
   fs.writeFileSync(data_path, JSON.stringify(data, null, 2));
}

function loadDataFromCache(){

   if(fs.existsSync(data_path)){
      return JSON.parse(fs.readFileSync(data_path, 'utf8'));
   }
   return null;
}

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

const normalizeText = (text: string) => 
   text
     .normalize('NFD')               // Decompõe caracteres acentuados (ex: 'á' vira 'a' + '´')
     .replace(/[\u0300-\u036f]/g, "") // Remove os acentos (marcas de combinação)
     .toLowerCase().trim();                  // Opcional: ignora maiúsculas/minúsculas

class Library {

   verbose: boolean = false

   books: Book[] = [];
   users: User[] = [];

   getInfoBooks(){
      return this.books
   }

   getInfoUsers(){
      return this.users
   }

   serchBookbyTittle(book_title : Book["title"]){
      book_title = normalizeText(book_title)

      const searched_book = this.books.filter(b => normalizeText(b.title) === book_title)
      return searched_book
   } // pesquisa livro pelo titulo e retorna os livros com títulos encontrados

   searchBookByPartialTitle(title: string){
      const normalizedSearch = normalizeText(title);
      return this.books.filter(books => normalizeText(books.title).includes(normalizedSearch))

   } // através de uma letra pesquisa todos os titulos que possuem aquela letra

   borrowBook(isbn: Book['isbn'], user : User){

      const selected_book = this.books.find(b => b.isbn === isbn)

      if(selected_book && selected_book.status == 'available') {
         selected_book.status = "borrowed"
         const borrowedBook = {...selected_book, borrowedAt: new Date()}

         user.borrowedBooks.push(borrowedBook)
         const book_borrowed = user.borrowedBooks.find(b => b.isbn === selected_book.isbn)

         const borrowedStatus = {
            name: user.name,
            book_borrowed: book_borrowed
         }

         console.log(`O livro ${borrowedStatus.book_borrowed?.title} foi emprestado com sucesso para o usuário ${borrowedStatus.name}`)

         return user.borrowedBooks 
      }

      else if (selected_book && selected_book.status === "borrowed" ) {
         console.log(`Sinto muito mas o livro ${selected_book.title}/${selected_book.isbn} já está emprestado`)

      } 
      else if (selected_book && selected_book.status === "unavailable" ) {
         console.log(`Sinto muito mas o livro ${selected_book.title}/${selected_book.isbn} não se econtra disnponível`)

      }
      else{
         console.log(`Livro com ISBN ${isbn} não encontrado`)
      }
   }; //emprestar livro referenciando o ISBN

   async createNewUser(verbose = false): Promise<User> {
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
         id: Math.floor(100000 + Math.random() * 90000),
         name : userName,
         createdAt: new Date,
         borrowedBooks : []
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
   }; // função de interação com o console

   async removeUser(verbose = false): Promise<User[] | undefined> {

         const getUserId = await rl.question("informe o ID do usuário: ");
      
         const userId = Number(getUserId);

         const user = this.users.find(b => b.id === userId)

         if(verbose == true){
            console.log(`O usuário ${user?.name} com o ID ${user?.id} foi excluído com sucesso.`)
            return this.users
         } else {
            return this.users
         }
   }; // função de interação com o terminal

   addBook(book: Book) {
      this.books.push(book)
      return
   }; // adicona um libro a lista de livros

   addUser(newUser: User){
      this.users.push(newUser)
   }; // adciona um usuário na lista de usuários

   removeBook(book_isbn: Book['isbn'], verbose = false) {
      
      const book_removed = this.books.filter(b => b.isbn === book_isbn) // Book[]
      
      this.books = this.books.filter(b => b.isbn !== book_isbn)

      if(verbose == true && book_removed[0]){
         console.log(`O livro ${book_removed[0].title}, isbn${book_isbn} foi removido com sucesso. `)
         return this.books
      }
      else {
         return this.books
      }
      
   }; // remove um livro da lista de livros

}


const biblicotecaPC = new Library();
const data_cache = loadDataFromCache();

if(data_cache){
   biblicotecaPC.books = data_cache.books;
   biblicotecaPC.users = data_cache.users;
}
else{
   biblicotecaPC.books = [];
   biblicotecaPC.users = [];
}


while(true){
   const selected_option = await rl.question(`\n\n 1 - Cadastrar Livro\n 2 - Cadastrar Usuário\n 3 - Emprestar Livro\n 4 - Devolver Livro\n 5 - Sair\n 6 - Listar Livros\n 7 - Listar Usuários\n\n Digite a opção: `);
   const optionNumber = Number(selected_option);

   switch(optionNumber){
      case 1:
         console.log("Cadastrar Livro");
         const isbn = await rl.question("ISBN: ");
         const title = await rl.question("Título: ");
         const author = await rl.question("Autor: ");
         const qtd = Number(await rl.question("Quantidade: "));
         const book_cadastrado: Book = {
            isbn: isbn,
            title: title,
            author: author,
            qtd: qtd,
            status: "available"
         }
         biblicotecaPC.addBook(book_cadastrado as Book);
         console.log("Livro cadastrado com sucesso");
         break;
      case 2:
         console.log("Cadastrar Usuário");
         const user_cadastrado = await biblicotecaPC.createNewUser(true);
         //console.log(`Usuário ${user_cadastrado.name} cadastrado com sucesso`);
         break;
      case 3:
         console.log("Emprestar Livro");
         break;
      case 4:
         console.log("Devolver Livro");
         break;
      case 5:
         console.log("Sair");
         break;
      case 6:
         console.log("Listar Livros");
         console.log(biblicotecaPC.getInfoBooks());
         break;
      case 7:
         console.log("Listar Usuários");
         console.log(biblicotecaPC.getInfoUsers());
         break;
      default:
         console.log("Opção inválida");
         break;
   }
}