// ╔══════════════════════════════════════════════════════════════════════╗
// ║ INTERFACES                                                           ║
// ╚══════════════════════════════════════════════════════════════════════╝


interface userWallet {
    coins?: number;
    credits?: number;
    [key: string]: any; // Permite propriedades extras como 'usd'
}

interface User {
    name: string;
    createdAt: Date;
    wallet?: userWallet;
}

interface User {
    readonly id: number; // Propriedade que não pode ser alterada
    talk(): void;
}

function createUser(name: string): User {
    return { 
        id: Math.floor(Math.random() * 1000),
        name, 
        createdAt: new Date(), 
        talk: () => {console.log("Hello, I'm " + name)}
    };
}

function updateWallet(user: User, wallet: userWallet){
    user.wallet = {...user.wallet, ...wallet};
}

const will = createUser("Will");

updateWallet(will, {coins: 100, credits: 100});


interface Admin extends User {
    ban(user: User): void;
    kick(user: User): void;
}

function promote(user: User): Admin {
    return {
        ...user,
        ban: (userToBan: User) => {console.log(`${userToBan.name} foi banido`)},
        kick: (userToKick: User) => {console.log(`${userToKick.name} foi expulso`)},
    }
}

// 1. TESTANDO O INDEX SIGNATURE (O erro do 'usd' some!)
updateWallet(will, {coins: 100, usd: 100}); 

// 2. TESTANDO O READONLY
// will.id = 123; // ❌ Erro: Cannot assign to 'id' because it is a read-only property

// 3. IMPLEMENTANDO EM CLASSES (implements)
class Member implements User {
    readonly id: number;
    name: string;
    createdAt: Date;
    
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.createdAt = new Date();
    }

    talk() {
        console.log(`Sou o membro ${this.name} e meu ID é ${this.id}`);
    }
}

const newMember = new Member(1, "Ana");
newMember.talk();

 