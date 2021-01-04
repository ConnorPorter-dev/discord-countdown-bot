const Discord = require('discord.js')
const bot = new Discord.Client()
const cd = require("./basic.js")
const fifteen = require("./fifteen.js")

require('dotenv').config()

bot.login(process.env.DISCORD_TOKEN);
const id = ">"

// Logs to console when ready
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
});

bot.on('message', msg => {
  //Prevents bot from responding to it's own message
  if (msg.author == bot.user) {
    return
  }
  // Checks starts with ID
  if (!msg.content.startsWith(id)) {
    return
  }

  // Dev Mode configured with .env
  if (process.env.DEV_MODE) {
    if (msg.author.id != process.env.USER_ID) {
      msg.reply("Currently Under Maintenance")
      return
    }
  }
  

  // Logger
  log(msg)

  // Remove ID from message
  let command = msg.content.substring(id.length).split(" ")

  // Base commands - can be accessed at all times
  switch (command[0]){
    // case "countdown":
    //  cd.coundownHandler(msg, command)
    //  break
    case "hello":
      msg.reply("Hello there")
      break
    case "help":
      msg.reply("https://www.youtube.com/watch?v=2Q_ZzBGPdqE")
      break
    case "15":
      fifteen.fifteenHandler(msg, command)
      break
  }

});

const log = (msg) => {
  console.log(`${msg.guild ? msg.guild.name : "DM"} | ${msg.author.tag} | ${msg.content}`)
}

