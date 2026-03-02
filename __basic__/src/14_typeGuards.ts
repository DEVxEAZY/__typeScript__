function printValue(value: string | number) {
    // Type Guard: typeof
    if (typeof value === "string") {
        console.log(`String: ${value.toUpperCase()}`);
    } else {
        console.log(`Number: ${value.toFixed(2)}`);
    }
}

printValue("Hello, World!");
printValue(123.456);

// Type Guard: instanceof
class Car {
    drive() {
        console.log("Driving a car...");
    }
}

class Boat {
    sail() {
        console.log("Sailing a boat...");
    }
}

function move(vehicle: Car | Boat) {
    if (vehicle instanceof Car) {
        vehicle.drive();
    } else {
        vehicle.sail();
    }
}

const myCar = new Car();
const myBoat = new Boat();

move(myCar);
move(myBoat);

// Type Guard: in
interface Admin {
    name: string;
    privileges: string[];
}

interface Employee {
    name: string;
    startDate: Date;
}

type UnknownEmployee = Admin | Employee;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log("Name: " + emp.name);
    if ("privileges" in emp) {
        console.log("Privileges: " + emp.privileges);
    }
    if ("startDate" in emp) {
        console.log("Start Date: " + emp.startDate);
    }
}

const e1: Admin = {
    name: "Wylliam",
    privileges: ["create-server"]
};

printEmployeeInformation(e1);

export default printValue;


// User-Defined Type Guard

type Driver = Car | Boat;

function isCar(vehicle: Driver): vehicle is Car {
    return vehicle instanceof Car;
}

function isBoat(vehicle: Driver): vehicle is Boat {
    return (vehicle as Boat).sail !== undefined;
}

function useVehicle(vehicle: Driver) {
    if (isCar(vehicle)) {
        vehicle.drive();
    } else if (isBoat(vehicle)) {
        vehicle.sail();
    }
}

const myNewCar = new Car();
const myNewBoat = new Boat();

useVehicle(myNewCar);
useVehicle(myNewBoat);

// Type Guard em Métodos de Classe (this is)

abstract class FileSystemItem {
    constructor(public name: string) {}

    // O retorno "this is [Type]" permite que o método valide o tipo da própria instância
    isFile(): this is FileItem {
        return this instanceof FileItem;
    }

    isFolder(): this is FolderItem {
        return this instanceof FolderItem;
    }
}

class FileItem extends FileSystemItem {
    constructor(name: string, public content: string) {
        super(name);
    }
    
    readFile() {
        console.log(`Lendo arquivo '${this.name}': ${this.content}`);
    }
}

class FolderItem extends FileSystemItem {
    constructor(name: string, public children: FileSystemItem[]) {
        super(name);
    }

    listContent() {
        console.log(`Pasta '${this.name}' contém: ${this.children.map(c => c.name).join(", ")}`);
    }
}

function processFileSystemItem(item: FileSystemItem) {
    if (item.isFile()) {
        // Dentro deste bloco, 'item' é tratado como FileItem automaticamente
        item.readFile();
    } else if (item.isFolder()) {
        // Dentro deste bloco, 'item' é tratado como FolderItem automaticamente
        item.listContent();
    }
}

const myFile = new FileItem("config.json", "{ \"theme\": \"dark\" }");
const myFolder = new FolderItem("src", [myFile]);

processFileSystemItem(myFile);
processFileSystemItem(myFolder);
