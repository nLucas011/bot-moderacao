import { Modal } from "#base";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

import { join } from "path";
import { QuickDB } from "quick.db";

const rootdir = process.cwd();

const db = {
  config: new QuickDB({
    table: "config",
    filePath: join(rootdir, "database/config.sqlite"),
  }),
};
new Modal({
  customId: "ticket/modaltext-create-ticket",
  cache: "cached",
  isFromMessage: true,
  async run(interaction) {
    let inp = interaction.fields.getTextInputValue("ticket/modaltext/input");

    const roleticket: string | null = await db.config.get("config.roleticket");

    if (roleticket == null) {
      interaction.reply({
        content: `parece que voce nao definiu o cargo do ticket,\nuse o /config > canais para configurar o cargo`,
        ephemeral,
      });
      return;
    }

    const channelexisting = interaction.guild.channels.cache;
    const checkchannel = channelexisting.map((e) => e.name);
    let existing = false;

    for (let i = 0; i < checkchannel.length; i++) {
      checkchannel[i] == `ticket-${interaction.user.username}`
        ? (existing = true)
        : (existing = false);
    }

    if (existing) {
      interaction.reply({
        content: `Opss, parece que ja tem ticket aberto!!`,
        ephemeral,
      });
      return;
    }

    const parent: string | null = await db.config.get("config.ticketcategory");
    if (parent == null) {
      interaction.reply({
        content:
          "Parece que não tem nenhuma categoria configurada,\nuse o /config > canais para configurar a categoria do ticket.",
        ephemeral,
      });
      return;
    }

    const roleguild: any = interaction.guild.roles.cache.get(roleticket);
    if (!roleguild) {
      interaction.reply({
        content: `parece que voce não definiu o cargo do ticket,\nuse o /config > canais para configurar o cargo`,
        ephemeral,
      });
      return;
    }

    const canal = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: 0,
      parent: parent,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: ["ViewChannel", "SendMessages", "ReadMessageHistory"],
        },
        {
          id: interaction.user.id,
          allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"],
        },
        {
          id: roleguild,
          allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"],
        },
      ],
    });

    const supportuiticket = new EmbedBuilder()
      .setColor("Default")
      .setTitle("Atendimento Solicitado")
      .setDescription(
        `
        Olá ${interaction.user}
        Nossa equipe estará com voce o mais rapido possivel, peço que ja vá escrevendo o seu problema ou duvida.
        Motivo: \`${inp}\`
      `
      )
      .setTimestamp();

    const row = createRow(
      new ButtonBuilder({
        customId: "close-ticket",
        style: ButtonStyle.Danger,
        label: "Fechar ticket",
      })
    );

    await canal
      .send({
        content: `${interaction.user}`,
        embeds: [supportuiticket],
        components: [row],
      })
      .then(() => {
        interaction.reply({
          content: `ticket criado com sucesso ${canal}`,
          ephemeral,
        });
      });
  },
});
