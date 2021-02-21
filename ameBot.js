//Required Libraries
require('dotenv').config();
const fs = require("fs");
const Discord = require("discord.js");

//Client Setup
const client = new Discord.Client();

//Data for bot operations
const picDirPath = './amePics';
const quoteFilePath = './ameQuotes.txt';
const pictureList = fs.readdirSync(picDirPath);
const quoteList = fs.readFileSync(quoteFilePath).toString('utf-8').split('\n');

//Message parameters for bot commands
const botCalloutPrefix = '!ame';
const randomMessageCommand = 'speak';
const randomPicCommand = 'pic';

//Bot Error Responses
const unrecognizedParameter = 'I don\'t know what you mean by this, you bozo: ';

//Bot Logic
client.once('ready', () => {
	console.log('Ame online');
});

client.on('message', async message => {
	let msgContent = message.content.trim().split(/\s+/g);
	
	if (msgContent[0] == botCalloutPrefix) {
		if(msgContent.length > 1) {
			let msgParam = msgContent[1];
			
			switch(msgParam) {
				case randomMessageCommand:
					message.channel.send(getRandomQuote()).catch(console.error);
					break;
				case randomPicCommand:
					message.channel.send(getRandomPic()).catch(console.error);
					break;
				default:
					message.channel.send(unrecognizedParameter+msgParam).catch(console.error);
			}
			
		} else {
			message.channel.send(getRandomQuote(),getRandomPic()).catch(console.error);
		}
	}
});


client.on('error', () => {
	console.log(client.error);
});

client.login(); //Don't input token, handled by host

//Helper functions
function getRandomPic() {
	let imgId = Math.floor(Math.random() * pictureList.length);
	let imgName = pictureList[imgId];
	let attachment = new Discord.MessageAttachment(getImageFilePath(imgName), imgName);
	return attachment;
}

function getRandomQuote() {
	let qtID = Math.floor(Math.random() * quoteList.length);
	return quoteList[qtID];
}

function getImageFilePath(imgName) {
	return picDirPath+'/'+imgName;
}
