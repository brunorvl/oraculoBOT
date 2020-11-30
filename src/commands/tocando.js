module.exports = {
	name: 'tocando',
	description: 'Mostra a música que está sendo tocada no momento',
	usage: 'Mostra a música que está tocando no momento',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Nenhum som sendo reproduzido agora...');
		return message.channel.send(`🪕 Tocando: **${serverQueue.songs[0].title}**`);
	}
};
