import { Component } from "#base";
import {
  ActionRowBuilder,
  ComponentType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

new Component({
  customId: "buttonlock",
  type: ComponentType.Button,
  cache: "cached",
  async run(interaction) {
    const modal = new ModalBuilder({
      custom_id: "messblock/modaltext",
      title: "Coloque o texto",
    });

    const input = new ActionRowBuilder<TextInputBuilder>({
      components: [
        new TextInputBuilder({
          customId: "messblock/modaltext/input",
          label: "Palavra que voce deseja bloquear",
          placeholder: "coloque a palavra aqui",
          style: TextInputStyle.Short,
          required,
        }),
      ],
    });

    modal.addComponents(input);

    interaction.showModal(modal);
  },
});
