//Required Libraries
require('dotenv').config();
const fs = require("fs");
const Discord = require("discord.js");

//Client Setup
const client = new Discord.Client();

//Data for bot operations
const pictureList = fs.readdirSync('./amePics');

//Prefixes for bot commands
const randomPicPrefix = '!ame';

//Bot Logic
client.once('ready', () => {
	console.log('Ame online');
});

client.on('message', async message => {
	if (message.content.startsWith(randomPicPrefix)) {
		let imgId = Math.floor(Math.random() * pictureList.length);
		let imgName = pictureList[imgId];
		let attachment = new Discord.MessageAttachment('./amePics/'+imgName, ''+imgName);
		message.channel.send(attachment).catch(console.error);
	}
});

client.on('error', () => {
	console.log(client.error);
});

client.login(); //Don't input token, handled by host