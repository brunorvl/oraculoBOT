const { Util } = require('discord.js');
const ytdl = require('ytdl-core');
let search = require('youtube-search');
let opts = {
  maxResults: 1,
  key: 'AIzaSyCwruUG_wYFitHNF2ByWHCk25yJYybtLEo',
  type: 'video'
};
module.exports = {
	name: 'tocar',
	description: 'Tocar uma música',
	usage: ''+process.env.DISCORD_PREFIX+'tocar + link ou titulo Ex.: '+process.env.DISCORD_PREFIX+'tocar Hello ou '+process.env.DISCORD_PREFIX+'tocar https://www.youtube.com/watch?v=ZbZSe6N_BXs',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Sinto muito, mas você precisa estar em um canal de voz para tocar música!');
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('Não consigo me conectar ao seu canal de voz, verifique se tenho as permissões adequadas!');
		if (!permissions.has('SPEAK')) return message.channel.send('Não posso falar neste canal de voz, verifique se tenho as permissões adequadas!');

		var searchname = " ";
		if (args[0].indexOf('https') >= 0) { 		
			searchname = args[0];				
		} else {
			for(var i = 0;i < args.length;i++) { searchname = searchname +" "+args[i]; }
		}		
		console.log(searchname);
		let song = await search(searchname, opts, async function(err, results) {  
		  if(err) return console.log(err);
		  console.dir(results[0].id);
		  console.dir(results[0].link);
		  console.dir(results[0].title);
		  let song = {
				id: results[0].id,
				title: Util.escapeMarkdown(results[0].title),
				url: results[0].link
			};
			
			console.log(song);
		const serverQueue = message.client.queue.get(message.guild.id);
		
		if (serverQueue) {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs);
			return message.channel.send(`✅ **${song.title}** foi adicionado à fila`);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 2,
			playing: true
		};
		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		const play = async song => {
			const queue = message.client.queue.get(message.guild.id);
			if (!song) {
				queue.voiceChannel.leave();
				message.client.queue.delete(message.guild.id);
				return;
			}

			const dispatcher = queue.connection.play(ytdl(song.url))
				.on('finish', () => {
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
			queue.textChannel.send(`🪕 Começando a tocar: **${song.title}** \n Link: **${song.url}**`);
		};

		try {
			const connection = await channel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Não consegui entrar no canal de voz: ${error}`);
			message.client.queue.delete(message.guild.id);
			await channel.leave();
			return message.channel.send(`Não consegui entrar no canal de voz: ${error}`);
		}
		});
		
	}
};
