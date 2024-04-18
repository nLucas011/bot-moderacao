import { ApplicationCommandType } from "discord.js";
import { Command } from "#base";
import translate from "@iamtraction/google-translate";

new Command({
  name: "conselho",
  description: "retorna conselho aleatorios",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => {
        if (!res.ok) {
          interaction.reply({
            content: "ocorreu um erro de fale com o desenvolvedor do bot",
            ephemeral,
          });
        }
        return res.json();
      })
      .then(async (data: any) => {
        const conselho = data.slip.advice;

        let texttraduzido = await translate(conselho, { to: "pt" });
        await interaction.reply({
          content: `${texttraduzido.text}`,
          ephemeral,
        });
      });
  },
});
