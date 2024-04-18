import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import { Command } from "#base";

new Command({
  name: "lista",
  description: "lista de banimento e etc",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {
    const bans = await interaction.guild.bans.fetch();

    const listbans = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Lista de todos os usuarios Banido")
      .setDescription(bans.map((user) => user.user.tag).join("\n"));

    await interaction.reply({ embeds: [listbans], ephemeral });
  },
});
