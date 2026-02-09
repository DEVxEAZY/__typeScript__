// THE INTERSECTION TYPE -> &

interface Robot {
    material: string;
    fuel: string;

}

interface human {
    name: string;
    age: number;
}

type Cyborg = Robot & human;

const cyborg: Cyborg = {
    material: "metal",
    fuel: "electricity",
    name: "John",
    age: 20
}

//------------------------------------


interface MyFetchOptions {
    printInput: boolean;
    printTime: boolean;
}


type RequestOptions = RequestInit & MyFetchOptions;

export function myFetch(input: string, options?: RequestOptions) {
    if (options?.printInput) {
        console.log("Input: ", input)
    }
    if (options?.printTime) {
        console.log("Time: ", new Date().toISOString())
    }
    return fetch(input, options);
}