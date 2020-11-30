module.exports = {
	name: 'limpar',
	description: 'Comando para limpar a tela',
	usage: 'Limpa o chat',
	cooldown: 5,
	async execute(message) {
		const channel   = message.channel;
        const FetchMsg  = await channel.messages.fetch();
        await channel.bulkDelete(FetchMsg);
        message.reply("Tudo calmo por aqui agora...");
	}
};

