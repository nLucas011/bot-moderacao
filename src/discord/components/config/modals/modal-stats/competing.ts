import { Modal } from "#base";
import { ActivityType, EmbedBuilder } from "discord.js";
import { QuickDB } from "quick.db";
import { join } from "path";

const rootdir = process.cwd()

const db = {
    stats: new QuickDB({table: 'name', filePath: join(rootdir, "database/status.sqlite")})
}

new Modal({
    customId: "stats/modaltext-competing",
    cache: "cached",
    isFromMessage: true,
    async run(interaction) {
        let inp = interaction.fields.getTextInputValue('stats/modaltext/input');
        await db.stats.set('name.name', inp)
        await db.stats.set('name.activide', ActivityType.Competing)

        console.log('modal: ' + inp)

        let competingui = new EmbedBuilder()
         .setColor("Random")
         .setTitle("Atividade do Bot Ativado com Sucesso")
         .setDescription(`
          Atividade do bot setado com sucesso!! \n 
          Atividade: **Competing/Competindo**
          texto: ${inp}
          `)

        await interaction.client.user.setActivity({
            name: `${inp}`,
            type: ActivityType.Competing
        });

        interaction.reply({
            content: 'dados enviado com sucesso!!',
            embeds: [competingui],
            ephemeral
        })
    },
});