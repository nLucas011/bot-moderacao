import { Component } from "#base";
import { ActionRowBuilder, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

new Component({
    customId: "addban",
    type: ComponentType.Button, cache: "cached",
    async run(interaction) {
        const modal = new ModalBuilder({custom_id: 'listban/modaltext-add', title: 'Coloque o usuario'});
        
        const input = new ActionRowBuilder<TextInputBuilder>({
            components: [
                new TextInputBuilder({
                    customId: 'listban/modaltext/input-add',
                    label: 'id do usuario',
                    placeholder: 'coloque o id do usuario aqui',
                    style: TextInputStyle.Short,
                    required
             })
        ]})

        modal.addComponents(input)
  
        interaction.showModal(modal)
    
    },
});