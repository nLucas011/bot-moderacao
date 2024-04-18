import { Component } from "#base";
import { ActionRowBuilder, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

new Component({
    customId: "stats/playing",
    type: ComponentType.Button, cache: "cached",
    async run(interaction) {

        const modal = new ModalBuilder({custom_id: 'stats/modaltext-playing', title: 'Coloque o texto'});
        
        const input = new ActionRowBuilder<TextInputBuilder>({
            components: [
                new TextInputBuilder({
                    customId: 'stats/modaltext/input',
                    label: 'Status',
                    placeholder: 'coloque o texto aqui',
                    style: TextInputStyle.Short,
                    required
             })
        ]})

        modal.addComponents(input)
  
        interaction.showModal(modal)


    //    interaction.client.user.setActivity({
    //     name: 'testando essa porra',
    //     type: ActivityType.Playing
    //    })

    //    let playingui = new EmbedBuilder()
    //    .setColor("Random")
    //    .setTitle("Atividade do Bot Ativado com Sucesso")
    //    .setDescription(`
    //     Atividade do bot setado com sucesso!! \n 
    //     Atividade: **Playing**
    //    `)

    //    interaction.reply({
    //     embeds: [playingui],
    //     ephemeral
    //    })
    },
});