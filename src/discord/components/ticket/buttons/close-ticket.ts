import { Component } from "#base";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";

new Component({
  customId: "close-ticket",
  type: ComponentType.Button,
  cache: "cached",
  async run(interaction) {
    const row = createRow(
      new ButtonBuilder({
        customId: "close-ticket-yes",
        style: ButtonStyle.Danger,
        label: "Sim",
      }),
      new ButtonBuilder({
        customId: "close-ticket-no",
        style: ButtonStyle.Success,
        label: "Não",
      })
    );
    await interaction.reply({
      content: "Você tem certeza que deseja fechar o ticket!?",
      ephemeral,
      components: [row],
    });
  },
});
