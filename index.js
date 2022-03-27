const venom = require("venom-bot");
const {conectaBd, enviaFrase} = require("./rodabd");
conectaBd()
venom.create({
    session: 'bot-Motivacional',
    multidevice: false
})
.then(cliente => start(cliente))
.catch(err => console.log(err));
const buttons = [
    {
      "buttonText": {
        "displayText": "Sim"
        }
      },
    {
      "buttonText": {
        "displayText": "Não"
        }
      }
]
async function start(cliente){
    cliente.onMessage(async message =>{
        console.log(message.body)
        if(message.body === 'Sim'){
            cliente
            .sendText(message.from, await enviaFrase())
        }else if(message.body === 'Não'){
            cliente
            .sendText(message.from, "Que pena, então até mais tarde ;).")
        }else{
            cliente
            .sendText(message.from, "Olá, sou seu Bot motivacional, aqui vai algumas opções: ")
            .then(async result =>{
                await cliente
                .sendButtons(`${result.to.remote.user}` + "@c.us", 'Bot motivacional', buttons, 'Deseja receber uma frase motivacional?')
                .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
                });
                console.log(result.to.remote.user)
            })
            .catch(erro => console.log(erro));
        }
    });

};

