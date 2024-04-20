import { Component } from "#base";
import { ComponentType } from "discord.js";

new Component({
    customId: "close-ticket-yes",
    type: ComponentType.Button, cache: "cached",
    async run(interaction) {

        interaction.channel?.delete().catch((e) => {
            interaction.reply({
                content: `algo deu errado, ${e}`,
                ephemeral
            })
        })
    },
});