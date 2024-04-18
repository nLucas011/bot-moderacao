import { Component } from "#base";
import {
  ActionRowBuilder,
  ComponentType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

new Component({
  customId: "stats/Streaming",
  type: ComponentType.Button,
  cache: "cached",
  async run(interaction) {
    const modal = new ModalBuilder({
      custom_id: "stats/modaltext-Streaming",
      title: "Coloque o texto",
    });

    const input = new ActionRowBuilder<TextInputBuilder>({
      components: [
        new TextInputBuilder({
          customId: "stats/modaltext/input",
          label: "Status",
          placeholder: "coloque o texto aqui",
          style: TextInputStyle.Short,
          required,
        }),
      ],
    });
    const inputurl = new ActionRowBuilder<TextInputBuilder>({
      components: [
        new TextInputBuilder({
          customId: "stats/modaltext/input-url",
          label: "Status",
          placeholder: "coloque a url aqui",
          style: TextInputStyle.Short,
          required,
        }),
      ],
    });

    modal.addComponents(input, inputurl);

    interaction.showModal(modal);
  },
});
