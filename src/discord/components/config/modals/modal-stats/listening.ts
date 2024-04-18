import { Modal } from "#base";
import { ActivityType, EmbedBuilder } from "discord.js";
import { QuickDB } from "quick.db";
import { join } from "path";

const rootdir = process.cwd()

const db = {
    stats: new QuickDB({table: 'name', filePath: join(rootdir, "database/status.sqlite")})
}

new Modal({
    customId: "stats/modaltext-listening",
    cache: "cached",
    isFromMessage: true,
    async run(interaction) {
        let inp = interaction.fields.getTextInputValue('stats/modaltext/input');
        await db.stats.set('name.name', inp)
        await db.stats.set('name.activide', ActivityType.Listening)
        console.log('modal: ' + inp)


        let Listeningui = new EmbedBuilder()
         .setColor("Random")
         .setTitle("Atividade do Bot Ativado com Sucesso")
         .setDescription(`
          Atividade do bot setado com sucesso!! \n 
          Atividade: **Listening/Ouvindo**
          texto: **${inp}**
          `)

        await interaction.client.user.setActivity({
          name: `${inp}`,
          type: ActivityType.Listening
        });

        interaction.reply({
            content: 'dados enviado com sucesso!!',
            embeds: [Listeningui],
            ephemeral
        })
    },
});