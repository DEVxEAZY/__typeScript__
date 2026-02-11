type GameConfig = string | number | boolean | null |  GameConfig[] | {[key: string]: GameConfig};

const meuStup: GameConfig = {

    "versão" : 1.0,
    "statusJogador" : true,
    "controles": {
        "controller" : { 
            "botõesDireita" : ["a","b","x","y"], 
            "gatilhos" : ["l1","l2","r1","r2"] },
            "teclado" : {
                "teclasJogaveis": ["q","w","e","r","t","y"]
            }
        },
    "saveAntigo": null,
    "conquistas" : {
        "titulo" : "Primeiro Passo",
        "desbloqueado" : true
    }
}
        
function exibirSomenteStrings(dados: GameConfig): void {

    if (typeof dados === "string")
        console.log("validação aceita, os dados são strings: ", dados)

}
