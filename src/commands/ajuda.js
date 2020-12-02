const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'ajuda',
    description: 'Comando para mostrar a ajuda',
    usage: 'Para obter a listagem com os comandos do Bot',
	cooldown: 5,
	async execute(message) {
       
        var allcmds = "";

        fs.readdir("./src/commands/", (err, files) => {
            if (err) return console.error(err);
            files.forEach((file) => {
                let props = require(`./${file}`);
                let commandName = file.split(".")[0];
                allcmds+="``"+process.env.DISCORD_PREFIX+commandName+" `` ~ "+props.usage+"\n";
            });
            
            let commandinfo = new MessageEmbed()
                            .setTitle("Listagem de comandos do Bot")
                            .setColor("gray")
                            .setDescription(allcmds);

            message.channel.send(commandinfo);
            
        });              
        
	}
};

