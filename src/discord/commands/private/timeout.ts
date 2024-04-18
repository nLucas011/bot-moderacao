import { Command } from "#base";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";
import ms from "ms";

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
    },
    {
      name: "tempo",
      description: "Duração do castigo (20s, 30m, 1h, 1day).",
      type: ApplicationCommandOptionType.String,
    },
  ],
  async run(interaction) {
    let user = interaction.options.getUser("usuario");
    let time: any = interaction.options.get("tempo")!.value;
    let duration: any = ms(time);

    let mention = interaction.guild.members.cache.get(user!.id);
    if (!mention) {
      return interaction.reply({
        content: `usuario: ${user!.id} não se encontra no servidor`,
        ephemeral,
      });
    }

    const { default: prettyMs } = await import("pretty-ms");
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
