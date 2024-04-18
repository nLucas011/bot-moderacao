import { Component } from "#base";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, ComponentType, EmbedBuilder } from "discord.js";
import { join } from "path";
import { QuickDB } from "quick.db";

const rootdir = process.cwd()

const db = {
    list: new QuickDB({table: 'list', filePath: join(rootdir, "database/messblock.sqlite")}),
    config: new QuickDB({table: 'config', filePath: join(rootdir, "database/config.sqlite")})
}
new Component({
    customId: "config/selectmenu",
    type: ComponentType.StringSelect, cache: "cached",
    async run(selectinteraction) {

        const opc1 = selectinteraction.values[0]

            if (opc1 === 'config/stats') {
    
                let embed = new EmbedBuilder()
                .setColor("Random")
                .setAuthor({ 
                    name: 'Tipo de Status', 
                    iconURL: selectinteraction.guild.iconURL({extension: "png" }) ?? undefined 
                })
                .setDescription(`
                    Escolha o tipo de atividade que voce quer para o bot.
                `)
    
                const row = createRow(
                    new ButtonBuilder({
                       customId: `stats/playing`,
                       label: 'Playing',
                       emoji: '🎮',
                       style: ButtonStyle.Success
                   }),
                    new ButtonBuilder({
                       customId: `stats/watching`,
                       label: 'Watching',
                       emoji: '📺',
                       style: ButtonStyle.Danger
                   }),
                    new ButtonBuilder({
                       customId: `stats/listening`,
                       label: 'Listening',
                       style: ButtonStyle.Success
                   }),
                    new ButtonBuilder({
                       customId: `stats/Competing`,
                       label: 'Competing',
                       style: ButtonStyle.Danger
                   }),
                    new ButtonBuilder({
                       customId: `stats/Streaming`,
                       label: 'Streaming',
                       style: ButtonStyle.Secondary
                   }),
               );
    
                selectinteraction.reply({
                    embeds: [embed],
                    components: [row],
                    ephemeral
                })
            } 

            if (opc1 === 'config/messblock') {
                let listvalue: any = await db.list.get('list')
            
            let messblockui = new EmbedBuilder()
                .setColor("Random")
                .setAuthor({ name: 'lista de todas as palavras bloqueadas', iconURL: selectinteraction.guild.iconURL({ extension: 'png' }) ?? ''})
                .setDescription(`
                  veja abaixo a lista de todas as palavras. \n
                  ${listvalue.join("\n")}
            `);
    
                const row = createRow(
                    new ButtonBuilder({
                        label: "Adicionar",
                        customId: "buttonlock",
                        style: ButtonStyle.Success,
                        emoji: "🎯"
                    }),
                    new ButtonBuilder({
                        label: "Remover",
                        customId: "buttondelete",
                        style: ButtonStyle.Danger,
                        emoji: "🎯"
                    })
                )
    
                await selectinteraction.reply({
                    embeds: [messblockui],
                    components: [row],
                    ephemeral
                })

            }
            
            if (opc1 === "config/banlist") {

                let bans = await selectinteraction.guild.bans.fetch() // obtendo a lista de banimento do servidor
                let listbans = new EmbedBuilder()
                 .setColor("Random")
                 .setTitle("Todos os usuarios Banidos!")
                 .setDescription(bans.map(user => user.user.tag).join('\n')) // mapeamento os usuarios banido para seu username e separando com quebra de linha.
                 
                 const row = createRow(
                    new ButtonBuilder({
                        label: "Adicionar",
                        customId: "addban",
                        style: ButtonStyle.Success,
                        emoji: "🎯"
                    }),
                    new ButtonBuilder({
                        label: "Remover",
                        customId: "deleteban",
                        style: ButtonStyle.Danger,
                        emoji: "🎯"
                    })
                )
            selectinteraction.reply({
                embeds: [listbans], 
                components: [row],
                ephemeral
            });
            
            }

            if (opc1 === "config/canais") {

                let channellogs = await db.config.get('config.channellog')

                const channel = selectinteraction.guild.channels.cache.get(channellogs)
                
                let uichannel = new EmbedBuilder()
                .setAuthor({ name: 'Configuração - Canais', iconURL: selectinteraction.guild.iconURL({ extension: 'png'}) ?? ''})
                .addFields(
                    { name: 'Logs', value: `${channel ?? 'nenhum canal definido'}` },
                )

                const row = createRow(
                    new ChannelSelectMenuBuilder({
                        customId: 'config/canais/selectmenu',
                        placeholder: "selecione o canal",
                        channelTypes: [ChannelType.GuildText],
                        maxValues: 1,
                        minValues: 1
                     })
                )

                await selectinteraction.reply({
                    embeds: [uichannel],
                    components: [row],
                    ephemeral
                })
            }
    }
});