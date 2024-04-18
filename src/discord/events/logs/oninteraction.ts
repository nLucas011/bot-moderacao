import { Event } from "#base";
import { time } from "discord.js";
import { join } from "path";
import { QuickDB } from "quick.db";

const rootdir = process.cwd()

const db = {
    config: new QuickDB({table: 'config', filePath: join(rootdir, "database/config.sqlite")})
}


new Event({
    name: "event: logs",
    event: "interactionCreate",

    async run(interaction) {
        if(!interaction.inCachedGuild()) return;
        
        if(interaction.isCommand()){
            const logschannel: string = await db.config.get('config.channellog') ?? "";
            const logs = interaction.guild.channels.cache.get(logschannel);
            if(!logs?.isTextBased()) return;
            const { commandType, createdAt, user, commandName, channel }: any = interaction;
            const emoji = ['⌨','👤 ', '✉']
            const text = [
                'usou o comando',
                'usou o contexto de usuario',
                'usou o contexto de mensagem'
            ];

            let content = `${emoji[commandType - 1]} ${time(createdAt, "R")}`;
            content += `**${user.username}** `;
            content += `__${text[commandType - 1]}__ `;
            content += `\`${commandName}\` `;
            if(channel) content += `em ${channel.url}`

            logs.send({ content })
            return;
        }
    }
});