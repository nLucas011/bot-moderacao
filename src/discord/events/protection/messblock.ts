import { Event } from "#base";
import { join } from "path";
import { QuickDB } from "quick.db";

const rootdir = process.cwd()

const db = {
    list: new QuickDB({table: 'list', filePath: join(rootdir, "database/messblock.sqlite")})
}

 // lista de array de palavra bloqueada
let contador = 0

new Event({
    name: "event: messageblock", // nome do event
    event: "messageCreate", // tipo do event

async run(message ) {
    if(message.author.id === message.guild!.ownerId) return; // se o author da mensagem for o dono do servidor nao ira retorna nada
    if(message.author.bot) return; // se o author da mensagem for um bot ira retorna nada
    if(message.member?.permissions.has('Administrator')) return; // se o author de uma mensagem for um adm ira retorna nada    
      
    const author = message.author
    const lista: string = await db.list.get('list') ?? 'erro ao tentar pegar a lista'

    for(const block of lista) {
      if(message.content.includes(block)) { // verificando se a mensagem criada contem alguma item do block/list
         message.delete() // deletar a mensagem
         contador++; // aumentar o contador em + 1
         break;
      }
    }

    switch (contador) {
      case 1:
        let mes = message.reply({ content: `${author} Que feio!!, acha isso bonito!? não repita isso novamente, se não vou ter que tomar medida extras.`, // se caso conter algum item do array. ira apagar a mensagem e vai mandar essa
        allowedMentions: { parse: ['users'], repliedUser: true } }) // mencionando o usuario
        setTimeout(async () => {
          ;(await mes).delete()
        }, 30000)
        break;
      case 2:
        let motion =  message.guild!.members.cache.get(author!.id)
        console.log(motion?.user.tag)
        motion!.timeout(10000, 'citando palavras feias')
      break;
      case 3:
        const motion2 = message.guild!.members.cache.get(author!.id)
        console.log(motion2?.user.tag)
        motion2!.timeout(60 * 60 * 1000, 'castigo de 1hora, motivo: citando varias palavrão')
      break;

    }

    setTimeout(() => {
      contador = 0
    }, 60000)

   console.log(contador)
  },
});