import { Event } from "#base";
import { Collection, EmbedBuilder } from "discord.js";

const members: Collection<string, number> = new Collection();

new Event({
  name: "event: spam",
  event: "messageCreate",
  async run(message) {
    if (!message.inGuild()) return; // se nao for uma guild retorna nada
    if (message.author.bot) return; // se for uma mensagem de um bot retorna nada
    if (message.author.id === message.guild.ownerId) return; // se for uma mensagem do dono do servidor retorna nada
    if (message.member?.permissions.has("Administrator")) return; // se for um adm do servidor retorna nada

    const { author, member, channel } = message;

    const count = members.get(author.id);
    if (!count) {
      members.set(author.id, 1);
      return;
    }

    const newcount = count + 1;
    members.set(author.id, newcount);

    if (newcount >= 4) {
      members.delete(author.id);

      member?.timeout(60000, "spam");

      const embed = new EmbedBuilder()
        .setDescription(`${author} evite o spam de mensagem!! 
              > leia as regras do servidor para evitar punições severas.`);

      const message = await channel.send({
        content: `||${author}||`,
        embeds: [embed],
      });

      setTimeout(() => {
        message.delete().catch(() => {});
      }, 60000);
      return;
    }

    setTimeout(() => {
      const currcount = members.get(author.id);
      if (!currcount) return;
      members.set(author.id, currcount - 1);
    }, 12000);
  },
});
