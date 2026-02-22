export class Player {
    private name: string;
    private helth: number = 100;
    constructor(name: string){
        this.name = name
    }
    public getName(){
        return this.name;
    }
    public getHelth(){
        return this.helth;
    }
    public damege(amount: number, damager?: Player){
        const updatedHelth = this.helth - amount
        console.log(damager 
            ? `${damager.getName()} deu ${amount} de dano em ${this.name}`
            : `${this.name} tomou ${amount} de dano`)
        
        if(updatedHelth<=0){
            this.helth=0;
            this.die();
            return
        }
        this.helth = updatedHelth
    }
    private die(damager? : Player){
        if(damager){
            console.log(`morreu por ${damager.getName}`)
            return;
        }
        console.log(`${this.name} morreu`);
    }

}

const X = new Player("goku")
const Y = new Player("vegeta")

X.damege(120, Y)

class Animal {
    public name : string
    public age : number
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
    makeSound(): void {
        console.log(`${this.name} está fazendo um som`);
    }
}
// extends

class Dog extends Animal { //herença de classe
    breed: string;
    constructor(name: string, age: number, breed: string){
        super(name,age)
        this.breed  = breed;
    }
    makeSound(): void {
        console.log(`${this.name} está latindo`);
        
    }
}

const dog = new Dog("spike",7,"Pastor Alemão")
dog.makeSound(); 



interface Drivable {
    startEngine(): void
    drive(): void 
}

class Car implements Drivable {
    startEngine(): void {
        console.log("O carro ligoou")
    }
    drive(): void {
        console.log("o carro está sendo dirigo")
    }

}


abstract class Shape {
    abstract area(): number
}


class Circle extends Shape {
    radius: number
    constructor(radius: number){
        super()
        this.radius = radius
    }
    area(): number {
        return Math.PI * this.radius**2;
    }
    protected discribe(){ // ---------> se eu quiser deixar ele acessível a uma classe que será extendida a partir de Circle
        // eu USO o protected
        console.log("isto é um circulo")
    }

}

class CircleRadius extends Circle {
    discribe(): void {
    }
}

const circulo = new CircleRadius(3)

console.log("raio: " + circulo.radius + " | area: " + circulo.area())