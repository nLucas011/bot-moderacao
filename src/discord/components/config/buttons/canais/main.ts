import { Component } from "#base";
import { createRow } from "@magicyan/discord";
import {
  ChannelSelectMenuBuilder,
  ChannelType,
  ComponentType,
  RoleSelectMenuBuilder,
} from "discord.js";

new Component({
  customId: "config/canais/options",
  type: ComponentType.StringSelect,
  cache: "cached",
  async run(interaction) {
    const opc1 = interaction.values[0];

    if (opc1 == "config/canais/selectmenu") {
      const row = createRow(
        new ChannelSelectMenuBuilder({
          customId: "config/canais/selectmenu",
          placeholder: "selecione o canal",
          channelTypes: [ChannelType.GuildText],
          maxValues: 1,
          minValues: 1,
        })
      );

      await interaction.reply({
        content: "selecione um canal",
        components: [row],
        ephemeral,
      });
    }
    if (opc1 == "config/canais/ticket-category") {
      const row = createRow(
        new ChannelSelectMenuBuilder({
          customId: "config/canais/ticket-category",
          placeholder: "selecione uma categoria",
          channelTypes: [ChannelType.GuildCategory],
          maxValues: 1,
          minValues: 1,
        })
      );

      await interaction.reply({
        content: "selecione uma categoria",
        components: [row],
        ephemeral,
      });
    }
    if (opc1 == "config/canais/role-ticket") {
      const row = createRow(
        new RoleSelectMenuBuilder({
          customId: "config/canais/role-ticket",
          placeholder: "selecione um cargo",
          maxValues: 1,
          minValues: 1,
        })
      );

      await interaction.reply({
        content: "selecione um cargo",
        components: [row],
        ephemeral,
      });
    }
  },
});
