import { Modal } from "#base";
import { EmbedBuilder } from "discord.js";

new Modal({
    customId: "listban/modaltext-remove",
    cache: "cached",
    isFromMessage: true,
    async run(interaction) {
         const des: string = interaction.fields.getTextInputValue("listban/modaltext/input-remove");

        if(!des) {
            interaction.reply({content: "o usuario: **" + des + '** nao esta na lista de banimento', ephemeral })
            return;
        } 

        let embed = new EmbedBuilder()
         .setColor("Random")
         .setTitle("Desbanimento foi concluido com sucesso!!")
         .setDescription("Usuario: **" + des + '** ' )
         .setFooter({ text: `Comando requisitado por: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL({ extension: "png" }) })

        let error = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Error: Usuario não se encontra na lista")
         .setDescription(`Não foi possível desbanir o usuário **${des}** (\`${des}\`) do servidor!`);

        interaction.guild.members.unban(des)
        .then(() => {
            interaction.reply({
                embeds: [embed],
                ephemeral
            }) 
        }).catch(e => {
            console.log(e)
            interaction.reply({
                embeds: [error],
                ephemeral
            }) 
        })
    },
});
