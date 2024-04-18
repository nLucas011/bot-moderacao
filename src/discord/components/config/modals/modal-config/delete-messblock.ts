import { Modal } from "#base";
import { EmbedBuilder } from "discord.js";
import { join } from "path";
import { QuickDB } from "quick.db";

const rootdir = process.cwd()

const db = {
    list: new QuickDB({table: 'list', filePath: join(rootdir, "database/messblock.sqlite")})
}
new Modal({
    customId: "messblock/modaltext-delete",
    cache: "cached",
    isFromMessage: true,
    async run(interaction) {
        let data = await db.list.get("list");

        let value = interaction.fields.getTextInputValue('messblock/modaltext/input-delete')
        
        let exist = false;
        
        for(const key of data) {
            if(key === value) {
                exist = true;
                break;
            } 
        }   

        if(exist === false) {
            interaction.reply({ content: 'esse valor nao existe na lista ', ephemeral})
            return;
        } else {
        
        await db.list.pull("list", value)
        
        let messblockdeleteui = new EmbedBuilder() 
        .setAuthor({ name: 'Palavra deletada', iconURL: interaction.guild.iconURL({extension: 'png'}) ?? ''}) 
        .setDescription(`
        o valor: **${value}** foi deletado com sucesso
        `)
        .setFooter({text: `comando executado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({extension: 'png'}) })
        
        interaction.reply({
            embeds: [messblockdeleteui],
            ephemeral
        })
     }
    },
});