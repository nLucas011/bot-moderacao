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
  customId: "config/canais/role-ticket",
  type: ComponentType.RoleSelect,
  cache: "cached",
  async run(interaction) {
    const role = interaction.values[0];
    await db.config.set("config.roleticket", role);

    const RoleSelectui = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Cargo do ticket Atualizado")
      .setDescription(`
       Cargo atualizado com sucesso!!
       Cargo Selecionado: ${interaction.guild.roles.cache.get(role)}
      `);

    await interaction.reply({
      embeds: [RoleSelectui],
      ephemeral,
    });
  },
});
