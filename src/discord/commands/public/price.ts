import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";
import { Command } from "#base";

new Command({
  name: "cotação",
  description: "cotação da moeda",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "moeda",
      description: "coloque a morda que voce quer ver a cotação",
      type: ApplicationCommandOptionType.String,
    },
  ],

  async run(interaction) {
    const money = interaction.options.getString("moeda");

    fetch(`https://economia.awesomeapi.com.br/${money}/1`)
      .then((res) => {
        if (!res.ok) {
          interaction.reply({
            content:
              "confira se voce colocou a forma da moeda certo, exemplo: `BRL-USD`",
            ephemeral,
          });
        }
        return res.json();
      })
      .then(async (data: any) => {
        if (data.length > 0) {
          const currency = data[0]; // Acessa o primeiro objeto da matriz
          const Name: string = currency.code;
          const cota: number = currency.ask;

          let priceembed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Cotação atual da " + Name)
            .setDescription(`a cotação atual: \`R$ ${cota}\` `);

          await interaction.reply({
            embeds: [priceembed],
            ephemeral,
          });
        } else {
          interaction.reply({
            content: "Não foi possível obter as informações da moeda.",
            ephemeral,
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  },
});
