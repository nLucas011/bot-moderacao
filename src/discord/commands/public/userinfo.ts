import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";
import { Command } from "#base";

new Command({
  name: "userinfo",
  description: "descubra informações de um usuario",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "usuario",
      description: "coloque o usuario",
      type: ApplicationCommandOptionType.User,
    },
  ],

  async run(interaction) {
    let user = interaction.options.getUser("usuario");
    if (!user) {
      user = interaction.user;
    }
    const accountcreatedate = user?.createdAt.toLocaleString();

    let uiembed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(`${user!.tag} - Informação da lenda`)
      .setThumbnail(user!.displayAvatarURL({ extension: "png" }))
      .setDescription(`
          🆔 Id da lenda: \`${user!.id}\` \n
          🎇 Username da lenda: \`${user!.tag}\` \n
          📅 Criação da conta \`${accountcreatedate}\` \n
          🤖 É um bot? \`${user?.bot ? "Sim" : "Não"}\`
        `);

    await interaction.reply({
      embeds: [uiembed],
      ephemeral,
    });
  },
});
