import { Modal } from "#base";
import { ActivityType, EmbedBuilder } from "discord.js";
import { QuickDB } from "quick.db";
import { join } from "path";

const rootdir = process.cwd()

const db = {
    stats: new QuickDB({table: 'name', filePath: join(rootdir, "database/status.sqlite")})
}

new Modal({
    customId: "stats/modaltext-watching",
    cache: "cached",
    isFromMessage: true,
    async run(interaction) {
        let inp = interaction.fields.getTextInputValue('stats/modaltext/input');
        await db.stats.set('name.name', inp)
        await db.stats.set('name.activide', ActivityType.Watching)
        console.log('modal: ' + inp)

        let watchingui = new EmbedBuilder()
         .setColor("Random")
         .setTitle("Atividade do Bot Ativado com Sucesso")
         .setDescription(`
          Atividade do bot setado com sucesso!! \n 
          Atividade: **Watching/Assistindo**
          texto: **${inp}**
          `)

        await interaction.client.user.setActivity({
           name: `${inp}`,
           type: ActivityType.Watching
        });

        interaction.reply({
            content: 'dados enviado com sucesso!!',
            embeds: [watchingui],
            ephemeral
        })
    },
});