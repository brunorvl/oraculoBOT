const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'teste',
	description: 'Teste serve para fazer uma jogada de dados',
	usage: '!teste 1d6+10 para ele rolar 1 dado de 6 somando + 10',
    cooldown: 3,
    execute(message, args) {
        var jogada = args[0].toLowerCase().trim();
        if (jogada.indexOf('d') > 0) {
            if (jogada.indexOf('+') > 0 || jogada.indexOf('-') > 0) {
                var jogadatexto = jogada; 
                if (jogada.indexOf('+') > 0) { jogada = jogada.split('+'); } else { jogada = jogada.split('-'); }                
                var dado = jogada[0];
                var soma = jogada[1];
                dado = dado.split('d');
                
                var ram = 0;
                var calculo = " ";
                var resultado = 0;
                var cont = 1;
                                
                if (parseInt(dado[0]) > 0) { cont = parseInt(dado[0]); }
                
                for(var i=0;i< cont;i++){
                    ram = Math.floor(Math.random() * parseInt(dado[1])) + 1;
                    resultado += ram;
                    if (i == 0) {
                        calculo = calculo+""+ram.toString();
                    } else {
                        calculo = calculo +" + "+ram.toString()+" ";
                    }
                }
                if (jogada.indexOf('+') > 0) {
                    calculo = calculo +" + ("+soma.toString()+") ";
                    resultado += parseInt(soma); 
                } else { 
                    calculo = calculo +" - ("+soma.toString()+") ";
                    resultado -= parseInt(soma); 
                }

                let jogadadedados = new MessageEmbed()
                    .setTitle(`O Oráculo pressente que...`)
                    .setDescription(`🎲  ${jogadatexto}:: ${calculo} = ${resultado}`)
                    .setColor("GREEN")
                
                return message.channel.send(jogadadedados);

            } else {

                var dado = jogada;
                var ram = 0;
                var calculo = " ";
                var resultado = 0;
                var cont = 1;
                
                dado = dado.split('d');                
                
                if (parseInt(dado[0]) > 0) { cont = parseInt(dado[0]); }
                
                for(var i=0;i< cont;i++){
                    ram = Math.floor(Math.random() * parseInt(dado[1])) + 1;
                    resultado += ram;
                    if (i == 0) {
                        calculo = calculo+""+ram.toString();
                    } else {
                        calculo = calculo +" + "+ram.toString()+" ";
                    }
                }
                
                let jogadadedados = new MessageEmbed()
                    .setTitle(`O Oráculo pressente que...`)
                    .setDescription(`🎲  ${jogada}:: ${calculo} = ${resultado}`)
                    .setColor("GREEN")
                
                return message.channel.send(jogadadedados);

            }
        } else {
            return message.channel.send(`Formato inválido...`);
        }

    }
}