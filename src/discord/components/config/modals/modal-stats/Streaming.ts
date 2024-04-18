import { Modal } from "#base";
import { ActivityType, EmbedBuilder } from "discord.js";
import { QuickDB } from "quick.db";
import { join } from "path";

const rootdir = process.cwd();

const db = {
  stats: new QuickDB({
    table: "name",
    filePath: join(rootdir, "database/status.sqlite"),
  }),
};

new Modal({
  customId: "stats/modaltext-Streaming",
  cache: "cached",
  isFromMessage: true,
  async run(interaction) {
    let inp = interaction.fields.getTextInputValue("stats/modaltext/input");
    let url = interaction.fields.getTextInputValue("stats/modaltext/input-url");
    await db.stats.set("name.name", inp);
    await db.stats.set("name.activide", ActivityType.Streaming);
    await db.stats.set("name.url", url);

    const Streamingui = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Atividade do Bot Ativado com Sucesso").setDescription(`
          Atividade do bot setado com sucesso!! \n 
          Atividade: **Streaming/Ao vivo**
          texto: **${inp}**
          url: **${url}**
          `);

    await interaction.client.user.setActivity({
      name: `${inp}`,
      type: ActivityType.Streaming,
      url: `${url}`,
    });

    await interaction.reply({
      content: "Status mudado com sucesso!!",
      embeds: [Streamingui],
      ephemeral,
    });
  },
});
