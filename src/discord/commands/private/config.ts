import { ApplicationCommandType, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import { Command } from "#base";
import { createRow } from "@magicyan/discord";

new Command({
    name: "config",
    description: "configure o bot",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    async run(interaction){ 

        if(!interaction.member.permissions.has("Administrator")) {
            interaction.reply({ content: 'Infelizmente, Você nao tem permissão para usar esse comando.', ephemeral})
        } else {

        let configui = new EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: 'Configure o bot', iconURL: interaction.guild.iconURL({ extension: 'png'}) ?? ''})
        .setDescription("selecione a opção abaixo, para puder configurar o bot.")
        
        const row = createRow(
            new StringSelectMenuBuilder({
               customId: `config/selectmenu`,
               placeholder: 'selecione a opção',
               options: [
                   {label: 'Status', value: 'config/stats', emoji: '💫'},
                   {label: 'Palavra Bloqueada', value: 'config/messblock', emoji: '❌'},
                   {label: 'Banimento', value: 'config/banlist', emoji: '⚠'},
                   {label: 'Canais e Cargos', value: 'config/canais', emoji: '🔧'}
               ],
           }),
       );
        
        
        await interaction.reply({
            embeds: [configui],
            components: [row],
            ephemeral
        })
     }
    }
});