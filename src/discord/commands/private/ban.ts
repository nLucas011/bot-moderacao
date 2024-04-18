import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { Command } from "#base";

new Command({
    name: "ban",
    description: "faça algo ruim",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuario',
            description: 'insira o usuario',
            type: ApplicationCommandOptionType.User,
            required
        }
    ],
    async run(interaction){

        if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true });
        }

        if(!interaction.guild.members.me!.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Parece que estou sem permissões suficientes!", ephemeral: true });
        }

        const ban = interaction.options.getUser("usuario")

        console.log(ban)

        let guild = interaction.guild.members.cache.get(ban!.id);

        if(!guild) {
            interaction.reply({content: "o usuario: **" + ban!.tag + '** não se encontra no servidor', ephemeral })
            return;
        } 

        guild.ban()
        interaction.reply({ content: 'usuario foi banido com sucesso: ' + ban!.tag, ephemeral });
    }
});