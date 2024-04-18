import { Command } from "#base";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";

new Command({
  name: "votação",
  description: "faça uma votação",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "titulo",
      description: "titulo da votação",
      type: ApplicationCommandOptionType.String,
      required,
    },
    {
      name: "descricao",
      description: "descrição da votação",
      type: ApplicationCommandOptionType.String,
      required,
    },
    {
      name: "canal",
      description: "Opcional: canal da votação",
      type: ApplicationCommandOptionType.Channel,
    },
  ],
  async run(interaction) {
    if (!interaction.member.permissions.has("ManageMessages")) {
      interaction.reply({
        content: `OHH, parece que voce nao tem permissao de \`Gerenciar Mensagem\`.`,
        ephemeral,
      });
      return;
    }

    let title = interaction.options.getString("titulo");
    let description = interaction.options.getString("descricao");
    let channels = interaction.options.getChannel("canal");
    if (channels === null) {
      channels = interaction.channel;
    }

    let channel = interaction.guild.channels.cache.get(channels!.id);
    if (!channel?.isTextBased()) return;

    let votingui = new EmbedBuilder()
      .setAuthor({
        name: `${title}`,
        iconURL: interaction.guild.iconURL({ extension: "png" }) ?? "",
      })
      .setDescription(`${description}`);

    const msg = channel.send({
      embeds: [votingui],
    });

    (await msg).react("✅");
    (await msg).react("❌");

    interaction.reply({
      content: `votação enviada com sucesso!!`,
      ephemeral,
    });
  },
});
