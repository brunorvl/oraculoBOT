module.exports = {
	name: 'voltar',
	description: 'Voltar a tocar música',
	usage: 'Volta a tocar a música pausada',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ voltar a tocar música');
		}
		return message.channel.send('Não há nada tocando.');
	}
};
