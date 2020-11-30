module.exports = {
	name: 'pular',
	description: 'Pular a música',
	usage: 'Pula a música que está tocando para outra na fila',
	cooldown: 5,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Sinto muito, mas você precisa estar em um canal de voz para tocar música!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Não há nada reproduzindo que eu pudesse pular para você.');
		serverQueue.connection.dispatcher.end('Comando pular música foi usado');
	}
};
