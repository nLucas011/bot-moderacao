import { Component } from "#base";
import {
  ActionRowBuilder,
  ComponentType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

new Component({
  customId: "create-ticket",
  type: ComponentType.Button,
  cache: "cached",
  async run(interaction) {
    const modal = new ModalBuilder({
      custom_id: "ticket/modaltext-create-ticket",
      title: "Coloque o texto",
    });

    const input = new ActionRowBuilder<TextInputBuilder>({
      components: [
        new TextInputBuilder({
          customId: "ticket/modaltext/input",
          label: "Ticket",
          placeholder: "coloque o motivo do atendimento aqui",
          style: TextInputStyle.Short,
          required,
        }),
      ],
    });

    modal.addComponents(input);

    interaction.showModal(modal);
  },
});
