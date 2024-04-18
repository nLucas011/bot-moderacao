import { Modal } from "#base";

new Modal({
    customId: "listban/modaltext-add",
    cache: "cached",
    isFromMessage: true,
    async run(interaction) {

        let ban = interaction.fields.getTextInputValue("listban/modaltext/input-add")
        console.log(ban)

        let guild = interaction.guild.members.cache.get(ban);

        if(!guild) {
            interaction.reply({content: "o usuario: **" + ban + '** não se encontra no servidor', ephemeral })
            return;
        } 

        guild.ban()
        interaction.reply({ content: 'usuario foi banido com sucesso: ' + ban, ephemeral });
    },
});