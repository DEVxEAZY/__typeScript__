function main(){

    const person = {
        name: "will",
        age: 23,
        isProgrammer:  true
    }

    const {name} = person;
    console.log (name)

}



function main_array(){

    const colors = ["amarelo", "preto", "vermelho", "rosa", "roxo" ]
    const [firstColor, secondColor] = colors
    console.log(firstColor, secondColor)
}

function main_complexObject(){
    const player = {
        nickname: "Will",
        health: 20,
        invetory: {
            items: ["sword","shield","bow"],
            potions: [
                {type : "regenetarion", duration: 8},
                {type : "defense", duration: 8},
            ]
        }

    }

    // 1. Desestruturando propriedades simples e renomeando
    const { nickname: nick, health } = player;
    console.log(`Player: ${nick}, Health: ${health}`);

    // 2. Desestruturando objetos aninhados
    // Aqui extraímos 'items' e 'potions' diretamente de dentro de 'invetory'
    const { invetory: { items, potions } } = player;
    
    console.log("Itens do inventário:", items);

    // 3. Desestruturando arrays
    const [firstItem, secondItem] = items;
    const [firstPotion, secondPotion] = potions;

    console.log("Primeiro item:", firstItem);
    console.log("Primeira poção:", firstPotion.type);

    // 4. Desestruturação profunda em uma única linha (exemplo extra)
    const { invetory: { potions: [{ type: firstPotionType }] } } = player;
    console.log("Tipo da primeira poção (extração profunda):", firstPotionType);

}

main_complexObject()

const apiResponse = {

    id : 244,
    name : "will",
    info : {
        email: "willEazy@mail.com",
        Address: "Boston",
        tel: "4234235325"
    },
    activate : true 

}

const {name, info : {tel}} = apiResponse

console.log(name, tel)

