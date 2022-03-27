const sqlite3 = require("sqlite3").verbose();
let db;
async function conectaBd(){
    db = new sqlite3.Database("frases.db",(err) =>{
        if(err){
            console.log(err.message)
        }
    })

}

async function selecionaFrase(id){
    return new Promise((resolve, reject) => {
        db.all(`SELECT frase FROM FRASES WHERE id = ${id}`, (err,row) =>{
            if(err){
                reject(err)
            }else{
                resolve(row)
            }
         })
    })
}

async function enviaFrase() {
    let rnd = Math.floor(Math.random()*70 + 1)
    let mensagem = await selecionaFrase(rnd);
    return mensagem[0].frase
}

module.exports = {enviaFrase, conectaBd}