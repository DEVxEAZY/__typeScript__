// ╔══════════════════════════════════════════════════════════════════════╗
// ║ EXERCÍCIO 2: MÉDIO (Extensões e Readonly)                            ║
// ╚══════════════════════════════════════════════════════════════════════╝

/*
  OBJETIVO:
  1. Crie uma interface 'Vehicle' com:
     - readonly brand (string)
     - model (string)
     - year (number)

  2. Crie uma interface 'Car' que estenda (extends) 'Vehicle' e adicione:
     - doors (number)
     - color? (string - opcional)

  3. Crie uma função 'paintCar' que recebe um 'Car' e uma nova 'color' (string).
     A função deve atualizar a cor do carro e não retornar nada (void).

  4. Tente alterar a 'brand' de um carro criado e veja o TypeScript reclamar.
*/

// --- DIGITE SEU CÓDIGO ABAIXO ---

/**
 * Interface base para representar um veículo genérico.
 * O modificador 'readonly' impede que o valor de 'brand' seja alterado após a inicialização.
 */
interface Vehicle {
   readonly brand : string
   model : string
   year : number
}

/**
 * Interface 'Car' que herda as propriedades de 'Vehicle'.
 * Além de brand, model e year, um carro possui chassi, HP e cor opcional.
 */
interface Car extends Vehicle{
   readonly chassi : string // O chassi também é imutável
   HP: number
   color? : string // A interrogação '?' define a propriedade como opcional
   showProperties?: () => void // Um método opcional que não retorna nada
}

/**
 * Função responsável por alterar a cor de um objeto do tipo 'Car'.
 * @param car Objeto que segue a interface Car
 * @param newColor Nova cor a ser atribuída
 * @param output Booleano para decidir se deve imprimir o resultado
 */
function paintCar(car: Car, newColor: string, output: boolean): void {
   // Atualiza a propriedade color do objeto original (passagem por referência)
   car.color = newColor
   
   if (output == true) {
      // Define dinamicamente o método showProperties caso queira imprimir
      car.showProperties = () => {console.log(`The colors car is ${car.color}`)}
      car.showProperties();
   }
}

// Criando uma instância (objeto) que satisfaz a interface Car
const raceCar: Car = {
   brand : "Mazda",
   model : "RX-7",
   year : 2002,
   chassi : "dsf-41234-fasd",
   HP: 2500,
   color: "Yellow",
}

// Chamada da função para pintar o carro e exibir o log
paintCar(raceCar, "red", true);

// Exemplo de erro que o TypeScript impediria (descomente para testar):
// raceCar.brand = "Ford"; // ❌ Erro: Cannot assign to 'brand' because it is a read-only property.







// --- RESULTADO ESPERADO ---
/*
  const myCar: Car = { brand: "Toyota", model: "Corolla", year: 2024, doors: 4 };
  paintCar(myCar, "Black");
  console.log(myCar.color); // "Black"
  
  // myCar.brand = "Ford"; // ❌ Isso deve gerar erro de compilação!
*/

