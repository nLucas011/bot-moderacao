import { Component } from "#base";
import { ActionRowBuilder, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

new Component({
    customId: "stats/watching",
    type: ComponentType.Button, cache: "cached",
    async run(interaction) {

        const modal = new ModalBuilder({custom_id: 'stats/modaltext-watching', title: 'Coloque o texto'});
        
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
    },
});