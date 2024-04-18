import { Component } from "#base";
import { ActionRowBuilder, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

new Component({
    customId: "buttondelete",
    type: ComponentType.Button, cache: "cached",
    async run(interaction) {

        const modal = new ModalBuilder({custom_id: 'messblock/modaltext-delete', title: 'Coloque aqui a palavra que voce quer tirar'});
        
        const input = new ActionRowBuilder<TextInputBuilder>({
            components: [
                new TextInputBuilder({
                    customId: 'messblock/modaltext/input-delete',
                    label: 'Palavra que voce deseja remover',
                    placeholder: 'coloque a palavra aqui',
                    style: TextInputStyle.Short,
                    required
             })
        ]})

        modal.addComponents(input)
  
        interaction.showModal(modal)
    },
});