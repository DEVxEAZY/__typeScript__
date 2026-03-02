function prinitValue(value: string | number | boolean) {
    if (typeof value === "string") {
        value
        return;
    }
    if (typeof value === "number") {
        value.toFixed(2);
        return;
    }
    value
}

class Dog {
    bark = (): void => {
        console.log("Au!");
    }
}
class Cat {
    meow(): void {
        console.log("Meow!");
    }
}

function createAnimal(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        animal.bark();
    } else {
        animal.meow();
    }
}

function verifyIfIsDog(animal: Dog | Cat) {
    if ("bark" in animal) {
        return true;
    }
    return false;
}

