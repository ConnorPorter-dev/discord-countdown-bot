const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').load();

client.login(process.env.DISCORD_TOKEN);
const id = ">"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  //Prevents bot from responding to it's own message
  if (msg.author == bot.user) {
    return;
  }
  // Checks starts with ID
  if (!msg.startsWith(id)) {
    return
  }
  // Remove ID from message
  let command = message.content.substring(id.length).split(" ");
  
  switch (command[0]){
    case "hello":
      message.send("Hello There")
  }
});

