module.exports = {
	name: 'parar',
	description: 'Parar todas as músicas',
	usage: 'Para todas as músicas que estão tocando',
	cooldown: 5,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Sinto muito, mas você precisa estar em um canal de voz para tocar música!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Não há nada tocando que eu pudesse impedir para você.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Comando parar foi usado.');
	}
};
