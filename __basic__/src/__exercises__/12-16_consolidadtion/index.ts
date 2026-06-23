class Product {
    nome: string;
    preco: number;

    descrever(): void {
        console.log(`Produto: ${this.nome}, Preço: ${this.preco}`);
    }
    constructor(nome: string, preco: number) {
        this.nome = nome;
        this.preco = preco;
    }
}

class Livro extends Product {
    autor: string;
    constructor(nome: string, preco: number, autor: string) {
        super(nome, preco); // chamaos o super pois o construtor da classe Product está sendo chamado
        this.autor = autor;
    }
    descrever(): void {
        super.descrever();
        console.log(`Autor: ${this.autor}`);
    }
}

class Eletronico extends Product {
    voltagem: number;
    constructor(nome: string, preco: number, voltagem: number) {
        super(nome, preco);
        this.voltagem = voltagem;
    }
    descrever(): void {
        super.descrever();
        console.log(`Voltagem: ${this.voltagem}`);
    }
}

interface taxaVenda {
    taxa: number;
    calcularTaxa(): number;
}

// typeGuard 

function isLivro(product: Product): product is Livro {
    return product instanceof Livro;
}

function isEletronico(product: Product): product is Eletronico {
    return product instanceof Eletronico;
}

function getDetails(product: Product): string {
    if (isLivro(product)) {
        return `Livro: ${product.nome}, Autor: ${product.autor}`;
    }
    if (isEletronico(product)) {
        return `Eletronico: ${product.nome}, Voltagem: ${product.voltagem}`;
    }
    return `Produto: ${product.nome}, Preço: ${product.preco}`;
}


function embalarProduto<T extends Product>(product: T): T {
    console.log(`Embalando produto: ${product.nome}`);
    return product;
}


