import { Modal } from "#base";
import { EmbedBuilder } from "discord.js";
import { join } from "path";
import { QuickDB } from "quick.db";

const rootdir = process.cwd();

const db = {
  list: new QuickDB({
    table: "list",
    filePath: join(rootdir, "database/messblock.sqlite"),
  }),
};

new Modal({
  customId: "messblock/modaltext",
  cache: "cached",
  isFromMessage: true,
  async run(interaction) {
    let data = await db.list.get("list");
    let exists = false;
    let valor: any = interaction.fields.getTextInputValue(
      "messblock/modaltext/input"
    );

    for (const item of data) {
      if (item === valor) {
        exists = true;
        break;
      }
    }

    if (exists) {
      interaction.reply({
        content: `O valor \`${valor}\` ja existe na lista.`,
        ephemeral,
      });
      return;
    }

    await db.list.push("list", valor);

    let messblockui = new EmbedBuilder()
      .setAuthor({
        name: "Palavra colocada com sucesso!",
        iconURL: interaction.guild.iconURL({ extension: "png" }) ?? "",
      })
      .setDescription(
        `a seguinte palavra foi colocada com sucesso na lista. \n Palavra adicionada: **${valor}** `
      );

    await interaction.reply({
      embeds: [messblockui],
      ephemeral,
    });
  },
});
