import { Command } from "#base";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";

new Command({
  name: "emoji",
  description: "gerencie os emoji",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "adicionar",
      description: "adicione o emoji ",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "nome",
          description: "coloque o nome do emoji",
          type: ApplicationCommandOptionType.String,
          required,
        },
        {
          name: "emoji",
          description:
            "adicione o emoji, caso o emoji ja existe coloque aqui ou coloque o link",
          type: ApplicationCommandOptionType.String,
          required,
        },
      ],
    },
    {
      name: "lista",
      description: "veja a lista do emoji do seu servidor ",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "remover",
      description: "Remova o emoji desejado",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "removeemoji",
          description: "insira o id emoji",
          type: ApplicationCommandOptionType.String,
          required,
        },
        {
          name: "rasao",
          description: "Opcional: insira a Rasão",
          type: ApplicationCommandOptionType.String,
        },
      ],
    },
  ],
  async run(interaction) {
    if (!interaction.member.permissions.has("ManageEmojisAndStickers")) {
      interaction.reply({
        content: `Opss, parece voce que nao tem permissão de \`ManageEmojisAndStickers\``,
        ephemeral,
      });
    }

    const subs = interaction.options.getSubcommand();

    switch (subs) {
      case "adicionar": {
        const name = interaction.options.getString("nome");
        const emoji = interaction.options.getString("emoji");

        interaction.guild.emojis
          .create({
            attachment: `${emoji}`,
            name: `${name}`,
          })
          .catch((err) => {
            return interaction.reply({
              content: `Opss, ocorreu um erro: ${err}`,
              ephemeral,
            });
          });

        await interaction.reply({
          content: `o emoji foi criado com sucesso`,
          ephemeral,
        });
        break;
      }
      case "lista": {
        const emojis = interaction.guild.emojis.cache;
        const emojilist = emojis.map((e) => `${e}`).join(" - ");

        if (emojilist.length == 0) {
          interaction.reply({
            content: `Opss, parece que nao tem emoji na \`${interaction.guild.name}\` `,
            ephemeral,
          });
          return;
        }

        let listui = new EmbedBuilder()
          .setTitle("Veja todos os Emojis do servidor")
          .setDescription(`${emojilist}`);

        interaction.reply({
          embeds: [listui],
          ephemeral,
        });
        break;
      }
      case "remover": {
        const remover = interaction.options.getString("removeemoji")?.trim();
        const reason =
          interaction.options.getString("rasao") ?? "nenhum motivo citado!!";

        const rememoji = await interaction.guild.emojis
          .fetch()
          .then((e) => {
            return e.find((x) => x.name === remover || x.toString() == remover);
          })
          .catch((err) => {
            console.log(err);
          });

        if (!rememoji) {
          interaction.reply({
            content: "Parece que esse emoji não existe nesse servidor!!",
            ephemeral,
          });
          return;
        }

        rememoji
          .delete(reason)
          .then((emoji) => {
            let rememojiui = new EmbedBuilder()
              .setTitle("Emoji foi removido!!")
              .setDescription(
                `o emoji \`:${emoji.name}:\` foi removido com sucesso \n Rasão: \`${reason}\``
              )
              .setColor("Green");

            return interaction.reply({
              embeds: [rememojiui],
              ephemeral,
            });
          })
          .catch((err) => {
            return interaction.reply({
              content: `Opss, parece que nao foi possivel excluir, Motivo: ${err}`,
              ephemeral,
            });
          });
        break;
      }
    }
  },
});
