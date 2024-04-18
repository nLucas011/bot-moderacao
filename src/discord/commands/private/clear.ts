import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";
import { Command } from "#base";

new Command({
  name: "clear",
  description: "limpe o chat",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "quantidade",
      description: "coloque a quantidade de mensagem q voce que apagar",
      type: ApplicationCommandOptionType.Number,
      required,
    },
  ],
  async run(interaction) {
    let num: number = interaction.options!.getNumber("quantidade") ?? 0;

    if (!interaction.member.permissions.has("ManageMessages")) {
      await interaction.reply({
        content: `Você não possui permissão para utilizar este comando.`,
        ephemeral,
      });
      return;
    }

    if (num > 99 || num == 0) {
      await interaction.reply({
        content:
          "infelizmente nao tem como apagar mais de 100 mensagem, o maximo é de 99 ou 0 ",
        ephemeral,
      });
      return;
    }

    await interaction
      .channel!.bulkDelete(parseInt(num.toString()))
      .catch(async (err) => {
        await interaction.reply({
          content: `Opss, parece que ocorreu um erro: **${err}**`,
          ephemeral,
        });
        return;
      });

    let deleteui = new EmbedBuilder()
      .setColor("Random")
      .setDescription(
        `O canal de texo ${interaction.channel} teve \`${num}\` mensagens deletadas por \`${interaction.user.username}\`.`
      );

    await interaction.reply({
      embeds: [deleteui],
      ephemeral,
    });

    setTimeout(() => {
      interaction.deleteReply().catch((e) => {
        console.log(e);
        interaction.reply("ocorreu um erro ao deleta a interação: " + e);
      });
    }, 10000);
  },
});
