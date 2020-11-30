module.exports = {
	name: 'conselho',
    description: 'Comando para dar conselhos',
    usage: 'Para obter um conselho do Oraculo',
	cooldown: 5,
	async execute(message) {
		var frase = "";
        var ram = Math.floor(Math.random() * 26);

        switch(ram) {
            case 1:
            frase = "Na escuridão há grande perigo e grandes recompensas.";
            break;
            case 2:
            frase = "Às vezes o tempo pode ser aliado ou inimigo.";
            break;
            case 3:
            frase = "Há mais coisas na vida e no amor do que podemos ver.";
            break;
            case 4:
            frase = "O conhecimento será o seu escudo.";
            break;
            case 5:
            frase = "Aquele que tem a resposta e não a compreende é na verdade como aquele que nunca soube a resposta.";
            break;
            case 6:
            frase = "O caminho encontrará você.";
            break;
            case 7:
            frase = "Através do erro você conseguirão a vitória.";
            break;
            case 8:
            frase = "As más ações sempre retornam a quem as praticam.";
            break;
            case 9:
            frase = "Nada como um passeio sobre a lava quente para amaciar os pés.";
            break;
            case 10:
            frase = "Às vezes olhando para trás você pode ver mais claramente o caminho que está adiante.";
            break;
            case 11:
            frase = "Todas as coisas têm um propósito, inclusive a sua presença aqui.";
            break;
            case 12:
            frase = "As más ações sempre retornam a quem as praticam.";
            break;
            case 13:
            frase = "Quando tudo parecer perdido procurem o que reflete o que são e aquilo que mais desejam.";
            break;
            case 14:
            frase = "O lar é o reflexo do coração, um reflexo que você está começando a entender.";
            break;
            case 15:
            frase = "Algumas vezes o melhor jeito de convencer alguém que está errado é deixá-lo seguir seu caminho.";
            break;
            case 16:
            frase = "Todas as coisas são possíveis para os que têm o coração livre da maldade.";
            break;  
            case 17:
            frase = "Quando as coisas parecerem piores é porque estão melhores.";
            break;
            case 18:
            frase = "As pessoas podem ser muitas coisas. Às vezes o seu pior inimigo pode ser o seu maior aliado.";
            break;
            case 19:
            frase = "As pessoas podem ser muitas coisas. Às vezes o seu pior inimigo pode ser o seu maior aliado.";
            break;
            case 20:
            frase = "Aqueles que experimentam o poder uma vez nunca mais serão os mesmos.";
            break;
            case 21:
            frase = "Não é importante a rapidez com que se aprende, mas que se aprenda.";
            break;  
            case 22:
            frase = "Uma pequena boa ação pode levar a uma grande recompensa.";
            break;
            case 23:
            frase = "A cada ato de bravura, vocês crescerão mais e mais e serão recompensados a tempo";
            break;
            case 24:
            frase = "O mal não terminará enquanto o círculo não for quebrado";
            break;      
            case 25:
            frase = "A resposta não está no poder de alguém. Ela está no íntimo de cada um.";
            break;  
            default:
            frase = "Na escuridão há também a luz.";
        }
    
        message.reply(frase);
	}
};

