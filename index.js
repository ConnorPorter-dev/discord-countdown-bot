const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').load();
const id = ">"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === id +'ping') {
    msg.reply('Pong!');
  }
});

client.login(process.env.DISCORD_TOKEN);