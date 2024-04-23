import { Command } from "#base";
import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";
import translate from "@iamtraction/google-translate";

new Command({
  name: "translate",
  description: "traduza a frase",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "texto",
      description: "coloque o texto que voce deseja traduzir",
      type: ApplicationCommandOptionType.String,
      required,
    },
    {
      name: "idioma",
      description: "o idioma que voce deseja traduzire",
      type: ApplicationCommandOptionType.String,
    },
  ],
  async run(interaction) {
    try {
      const text = interaction.options.getString("texto")!.toString();
      const language: any = interaction.options.getString("idioma");

      if (!language) {
        await interaction.reply({
          content: "opa amigo, insira uma linguagem porfavor",
        });
        return;
      } else if (language == false) {
        await interaction.reply({
          content: `a linguagem **${language}** nao é suportada`,
          ephemeral: true,
        });
        return;
      }

      let texttraduzido = await translate(text, { to: language });

      console.log(texttraduzido);

      await interaction.reply(texttraduzido.text);
    } catch (error) {
      console.log(error);
    }
  },
});
