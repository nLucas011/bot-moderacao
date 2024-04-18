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
  customId: "config/canais/selectmenu",
  type: ComponentType.ChannelSelect,
  cache: "cached",
  async run(interaction) {
    const channelid = interaction.values[0];

    const channellogs: string | null = await db.config.get("config.channellog");

    const channel = interaction.guild.channels.cache.get(channelid);

    if (!channel) {
      interaction.reply({
        content: `o canal (${channel}) nao existe nesse servidor`,
        ephemeral,
      });
      return;
    } else {
      if (channel.id === channellogs) {
        interaction.reply({
          content: `Ops, esse canal ja esta setado!!`,
          ephemeral,
        });
        return;
      }
    }

    await db.config.set("config.channellog", channel.id);
    let channelui = new EmbedBuilder().setAuthor({
      name: "Canal de logs setado",
      iconURL: interaction.guild.iconURL({ extension: "png" }) ?? "",
    }).setDescription(`
        o canal foi setado com sucesso!
        Canal: *${channel.name}*
        `);

    interaction.reply({
      embeds: [channelui],
      ephemeral,
    });
  },
});
