module.exports = {
	name: 'queue',
	description: 'Queue command.',
	usage: 'Lista com as músicas adicionadas',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Não há nada tocando.');
		return message.channel.send(`__**Fila de músicas:**__${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')} **Tocando agora:** ${serverQueue.songs[0].title}`);
	}
};
