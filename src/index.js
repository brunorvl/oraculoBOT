require('dotenv').config();
const { readdirSync } = require('fs');
const { join } = require('path');
const MusicClient = require('./struct/Client');
const { Collection } = require('discord.js');
const client = new MusicClient({ token: process.env.DISCORD_TOKEN, prefix: process.env.DISCORD_PREFIX });
global.CLIENT_ID = 0; 

const mongoose = require('mongoose');

/*
var url = 'mongodb://localhost:27017/teste';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const sistema = new Schema({
	name: { type: String, default: 'hahaha' },
	age: { type: Number, min: 18, index: true },
	bio: { type: String, match: /[a-z]/ },
	date: { type: Date, default: Date.now },
	buff: Buffer
  });
  
const MyModel = mongoose.model('sistema');
const m = new MyModel;
m.sistema.push({ title: 'My comment' });

m.save(function (err) {
  if (!err) console.log('Success!');
});
*/

var url = 'mongodb://localhost:27017/teste';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

var Schema = mongoose.Schema;  
  
var userDataSchema = new Schema({  
 nome: {type: String, required: true},  
 email: String,  
 telefone: String  
}, {collection: 'contatos'});  
  
var Contatos = mongoose.model('UserData', userDataSchema);  

var item = {  
   nome: 'Irado',  
   email: 'irado@gmail.com',  
   telefone: '(81) 4444-55555'  
};  
  
 var data = new Contatos(item);  
 data.save();


const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', `${file}`));
	client.commands.set(command.name, command);
}

client.once('ready', () => { 
	console.log('READY!'); 
	CLIENT_ID = client.user.id;
});

client.on('message', message => {
	if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
	const args = message.content.slice(client.config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (command.guildOnly && message.channel.type !== 'text') return message.reply('N??o consigo executar esse comando dentro dos DMs!');
	if (command.args && !args.length) {
		let reply = `Voc?? n??o forneceu nenhum argumento, ${message.author}!`;
		if (command.usage) reply += `\nO uso adequado seria: \`${client.config.prefix}${command.name} ${command.usage}\``;
		return message.channel.send(reply);
	}
	if (!client.cooldowns.has(command.name)) {
		client.cooldowns.set(command.name, new Collection());
	}
	const now = Date.now();
	const timestamps = client.cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`por favor ${timeLeft.toFixed(1)} aguarde alguns segundos antes de reutilizar o comando \`${command.name}\` `);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('ocorreu um erro ao tentar executar esse comando!');
	}
});

client.login(client.config.token);
