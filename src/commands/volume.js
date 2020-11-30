module.exports = {
	name: 'volume',
	description: 'Comando para alterar o volume da música.',
	usage: ''+process.env.DISCORD_PREFIX+'volume + um número Ex.: '+process.env.DISCORD_PREFIX+'volume 1 para modificar o volume da música quem questão',
	cooldown: 5,
	execute(message, args) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Sinto muito, mas você precisa estar em um canal de voz para tocar música!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Não há nada tocando.');
		if (!args[0]) return message.channel.send(`O volume atual é: **${serverQueue.volume}**`);
		serverQueue.volume = args[0]; // eslint-disable-line
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return message.channel.send(`Volume ajustado para: **${args[0]}**`);
	}
};
