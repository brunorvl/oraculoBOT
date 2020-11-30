const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'invitar',
	description: 'Gera um link para chamar o bot para seu Canal',
	usage: 'Cria um link para convidar o bot para o seu canal',
	cooldown: 5,
	execute(message) {
		var permissions = 37080128;
        var client_id = CLIENT_ID;

        let invite = new MessageEmbed()
            .setTitle(`Convite para ${message.author.username}`)
            .setDescription(`Nobre aventureiro(a) desejas que entre em outro servidor? \n\n [Invite Link](https://discord.com/oauth2/authorize?client_id=${client_id}&permissions=${permissions}&scope=bot)`)
            .setURL(`https://discord.com/oauth2/authorize?client_id=${client_id}&permissions=${permissions}&scope=bot`)
            .setColor("PURPLE")
            return message.channel.send(invite);
	}
};
