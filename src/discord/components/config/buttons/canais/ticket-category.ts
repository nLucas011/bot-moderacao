import { Component } from "#base";
import { ComponentType, EmbedBuilder } from "discord.js";

import { join } from "path";
import { QuickDB } from "quick.db";

const rootdir = process.cwd();

const db = {
  config: new QuickDB({
    table: "config",
    filePath: join(rootdir, "database/config.sqlite"),
  }),
};

new Component({
  customId: "config/canais/ticket-category",
  type: ComponentType.ChannelSelect,
  cache: "cached",
  async run(interaction) {
    const channelid = interaction.values[0];

    const channellogs: string | null = await db.config.get(
      "config.ticketcategory"
    );

    const channel = interaction.guild.channels.cache.get(channelid);

    if (!channel) {
      interaction.reply({
        content: `a categoria (${channel}) nao existe nesse servidor`,
        ephemeral,
      });
      return;
    } else {
      if (channel.id === channellogs) {
        interaction.reply({
          content: `Ops, essa categoria ja esta setado!!`,
          ephemeral,
        });
        return;
      }
    }

    await db.config.set("config.ticketcategory", channel.id);

    let channelui = new EmbedBuilder()
    .setAuthor({
      name: "Categoria do ticket setado",
      iconURL: interaction.guild.iconURL({ extension: "png" }) ?? "",
    })
    .setDescription(`
     a categoria foi setado com sucesso!
     Categoria: *${channel.name}*
    `);

    interaction.reply({
      embeds: [channelui],
      ephemeral,
    });
  },
});
