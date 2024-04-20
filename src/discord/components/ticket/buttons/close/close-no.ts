import { Component } from "#base";
import { ComponentType } from "discord.js";

new Component({
  customId: "close-ticket-no",
  type: ComponentType.Button,
  cache: "cached",
  async run(interaction) {
    await interaction.deleteReply()
  },
});
