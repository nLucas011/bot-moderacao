import { Component } from "#base";
import { ActionRowBuilder, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

new Component({
    customId: "deleteban",
    type: ComponentType.Button, cache: "cached",
    async run(interaction) {
        const modal = new ModalBuilder({custom_id: 'listban/modaltext-remove', title: 'Coloque o usuario que queira remover o ban'});
        
        const input = new ActionRowBuilder<TextInputBuilder>({
            components: [
                new TextInputBuilder({
                    customId: 'listban/modaltext/input-remove',
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