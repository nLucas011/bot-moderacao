import { Command } from "#base";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";
import ms from "ms";
import prettyMs from "pretty-ms";

new Command({
  name: "castigo",
  description: "coloque alguem em castigo",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "usuario",
      description: "insira o usuario aqui",
      type: ApplicationCommandOptionType.User,
      required,
    },
    {
      name: "tempo",
      description: "Duração do castigo (20s, 30m, 1h, 1day).",
      type: ApplicationCommandOptionType.String,
    },
  ],
  async run(interaction) {
    const user = interaction!.options.getUser("usuario");
    const time: any = interaction.options.get("tempo")!.value;
    const duration: any = ms(time);
    const mention = interaction.guild.members.cache.get(user!.id);
    if (mention) {
      interaction.reply({
        content: `usuario: ${user!.id} não se encontra no servidor`,
        ephemeral,
      });
      return;
    }

    const timeoutui = new EmbedBuilder()
      .setTitle("Usuario foi Mutado!")
      .setColor("Random").setDescription(`
            Usuario: **${user!.tag}** \n 
            Duração do castigo:${prettyMs(duration, { verbose: true })} \n
            Moderador: ${interaction.user}
         `);

    mention!.timeout(duration);
    await interaction.reply({ embeds: [timeoutui] });
  },
});
