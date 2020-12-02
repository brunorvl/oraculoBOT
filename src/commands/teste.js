const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'teste',
	description: 'Teste serve para fazer uma jogada de dados',
	usage: '!teste 1d6+10 para ele rolar 1 dado de 6 somando + 10',
    cooldown: 3,
    execute(message, args) {
        var jogada = args[0].trim();
        if (jogada.indexOf(' ') == 0) {
            if (jogada.indexOf('+') >= 0) {
                jogada.split('+');
                var dado = jogada[0];
                var soma = jogada[1];
                dado = dado.split('d');
                resultado = (parseInt(dado[0]) * parseInt(dado[1])) + parseInt(soma);
                let jogadadedados = new MessageEmbed()
                    .setTitle(`Resultado da Jogada`)
                    .setDescription(`${dado[0]} x ${dado[1]} + ${soma} = ${resultado}`)
                    .setColor("green")
                
                return message.channel.send(jogadadedados);

            } else {

                var dado = jogada[0];
                var soma = jogada[1];
                dado = dado.split('d');
                resultado = (parseInt(dado[0]) * parseInt(dado[1]));
                let jogadadedados = new MessageEmbed()
                    .setTitle(`Resultado da Jogada`)
                    .setDescription(`${dado[0]} x ${dado[1]} = ${resultado}`)
                    .setColor("green")
                
                return message.channel.send(jogadadedados);

            }
        } else {
            return message.channel.send(`Formato inválido...`);
        }



    }
}