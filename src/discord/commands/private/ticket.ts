import { Command } from "#base";
import {
  ActionRowBuilder,
  ApplicationCommandType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

new Command({
  name: "criar-ticket",
  description: "crie um ticket",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {
    if (!interaction.member.permissions.has("ManageGuild")) {
      interaction.reply({
        content:
          "Hmm, parece que você não tem permisao de gerenciar o servidor",
        ephemeral,
      });
      return;
    }

    const modal = new ModalBuilder({
      customId: "ticket/create/modal",
      title: "Crie o seu Ticket",
    });

    const input = new ActionRowBuilder<TextInputBuilder>({
      components: [
        new TextInputBuilder({
          customId: "ticket/create/modal-input",
          label: "Coloque o titulo do ticket",
          placeholder: "new ticket",
          style: TextInputStyle.Short,
          required,
        }),
      ],
    });

    const inputdescription = new ActionRowBuilder<TextInputBuilder>({
      components: [
        new TextInputBuilder({
          customId: "ticket/create/modal-input/description",
          label: "coloque a descrição do ticket",
          placeholder: "new ticket",
          style: TextInputStyle.Paragraph,
          required,
        }),
      ],
    });

    const inputcolor = new ActionRowBuilder<TextInputBuilder>({
      components: [
        new TextInputBuilder({
          customId: "ticket/create/modal-input/color",
          label: "Coloque a cor do ticket",
          placeholder: "#FFFFFF",
          style: TextInputStyle.Short,
        }),
      ],
    });

    const inputbanner = new ActionRowBuilder<TextInputBuilder>({
      components: [
        new TextInputBuilder({
          customId: "ticket/create/modal-input/banner",
          label: "coloque a banner do ticket",
          style: TextInputStyle.Paragraph,
        }),
      ],
    });

    modal.addComponents(input, inputdescription, inputcolor, inputbanner);

    interaction.showModal(modal);
  },
});
