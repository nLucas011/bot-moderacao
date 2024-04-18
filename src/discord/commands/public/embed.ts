import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ColorResolvable,
  EmbedBuilder,
} from "discord.js";
import { Command } from "#base";

new Command({
  name: "embed",
  description: "create embed ",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "title",
      description: "coloque algum texto",
      type: ApplicationCommandOptionType.String,
      required,
    },
    {
      name: "description",
      description: "coloque algum texto",
      type: ApplicationCommandOptionType.String,
      required,
    },
    {
      name: "footer",
      description: "coloque algum texto",
      type: ApplicationCommandOptionType.String,
      required,
    },
    {
      name: "color",
      description: "coloque algum texto",
      type: ApplicationCommandOptionType.String,
    },
  ],
  async run(interaction) {
    const description = interaction.options.getString("description");
    const title = interaction.options.getString("title");
    const footer = interaction.options.getString("footer");
    let color = interaction.options.getString("color") as ColorResolvable;

    if (color == undefined) {
      color = "Random";
    }

    let embed = new EmbedBuilder()
      .setColor(color)
      .setTitle(title)
      .setDescription(description)
      .setFooter({ text: `${footer}` });

    interaction.reply({ embeds: [embed] });
  },
});
