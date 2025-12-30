// ╔══════════════════════════════════════════════════════════════════════╗
// ║ EXERCÍCIO 1: BÁSICO (Tipos e Interfaces Simples)                     ║
// ╚══════════════════════════════════════════════════════════════════════╝

/*
  OBJETIVO:
  1. Crie uma interface 'Product' com as propriedades:
     - name (string)
     - price (number)
     - isAvailable (boolean)
     - categories (array de strings)

  2. Crie uma função 'formatProduct' que recebe um 'Product' 
     e retorna uma string formatada.

  3. Crie uma constante 'notebook e carro' que siga a interface 'Product'.
*/

// --- DIGITE SEU CÓDIGO ABAIXO ---

interface Product {
    name: string,
    price: number,
    isAvailable: boolean,
    categories: string[],
}

function formatProduct(product: Product): string {
    return `Produto: ${product.name} | Preço: R$ ${product.price} | Categorias: ${product.categories.join(",")}`;

}


const notebook: Product = {
    name : "Dell G15",
    categories : ["Notebook Expresso", "Primeiro Notebook"],    
    isAvailable : true,
    price : 3000 
};


interface Car {
    name : string,
    category: string,
    HP: number,
    carBrand: string,
}


function formatCarApresentation(car: Car): string {
    return `Brooo! you have a ${car.name} (${car.carBrand}), this model is a ${car.category}, with ${car.HP}`
}

const raceCar: Car = {
    name: "Skyline",
    category : "Sport Car",
    HP : 1000,
    carBrand : "Nissan"
}

const ApresentationNissan = formatCarApresentation(raceCar);

console.log(ApresentationNissan)

















// --- RESULTADO ESPERADO ---
/*
  Ao final, você deve conseguir executar:
  const output = formatProduct(notebook);
  console.log(output); // Ex: "Produto: Dell G15 | Preço: R$ 5000 | Categorias: tech, gaming"
*/

