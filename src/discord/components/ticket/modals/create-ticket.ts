import { Modal } from "#base";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ColorResolvable, ComponentType, EmbedBuilder } from "discord.js";

new Modal({
  customId: "ticket/create/modal",
  cache: "cached",
  isFromMessage: true,
  async run(interaction) {
    const title = interaction.fields.getTextInputValue(
      "ticket/create/modal-input"
    );
    const description = interaction.fields.getTextInputValue(
      "ticket/create/modal-input/description"
    );
    const color = interaction.fields.getTextInputValue("ticket/create/modal-input/color") as ColorResolvable
    const banner = interaction.fields.getTextInputValue(
      "ticket/create/modal-input/banner"
    );

    const channelid = interaction.channel;
    if (!channelid?.isTextBased()) return;

    const ticketui = new EmbedBuilder()
      .setColor(color ?? "Default")
      .setTitle(title)
      .setDescription(description)
      .setImage(banner)

    const row = createRow(
      new ButtonBuilder({
        customId: "create-ticket",
        label: "Criar ticket",
        type: ComponentType.Button,
        style: ButtonStyle.Success,
      })
    );
    
    await channelid
      .send({
        embeds: [ticketui],
        components: [row],
      })
      .then(() => {
        interaction.reply({
          content: "ticket enviado com sucesso!!",
          ephemeral,
        });
      })
      .catch((err) => {
        interaction.reply({
          content: `algo deu errado: ${err}`,
          ephemeral,
        });
      });
  },
});
