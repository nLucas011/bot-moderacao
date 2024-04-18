import { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { Command } from "#base";

new Command({
    name: "unban",
    description: "faça algo bom - pelo menos uma vez na vida!!",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            description: 'insira o id do usuario',
            type: ApplicationCommandOptionType.User
        }
    ],
    async run(interaction){

        if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true });
        }

        if(!interaction.guild.members.me!.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Parece que estou sem permissões suficientes!", ephemeral: true });
        }

         const des: any = interaction.options.getUser("user");

        if(!des) {
            interaction.reply({content: "o usuario: **" + des + '** nao esta na lista de banimento', ephemeral })
            return;
        } 

        let embed = new EmbedBuilder()
         .setColor("Random")
         .setTitle("desbanimento foi concluido com sucesso!!")
         .setDescription("Usuario: **" + des.tag + '** ' )
         .setFooter({ text: `Comando requisitado por: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL({ extension: "png" }) })

        let error = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Error: Usuario não se encontra na lista")
         .setDescription(`Não foi possível desbanir o usuário **${des.tag}** (\`${des.id}\`) do servidor!`);

        interaction.guild.members.unban(des)
        .then(() => {
            interaction.reply({embeds: [embed]}) 
        }).catch(e => {
            console.log(e)
            interaction.reply({embeds: [error]}) 
        })



    }
});