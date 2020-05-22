const Discord = require('discord.js')
const fs = require('fs')
const util = require('util')

const fetch = require('node-fetch')
const streamPipeline = util.promisify(require('stream').pipeline)

const fifteenHandler = (msg, command) => {
    let messageToSend = ""
    command.forEach((word, index) => {
        if (index > 1) {
            messageToSend += word + " "
        }
    })
    console.log(messageToSend);
    if (messageToSend.length > 200) {
        msg.reply("Message too long, keep under 200 characters")
        return
    }
    switch (command[1]) {
        case "test":
            sendFile(msg)
            break;
    
        case "sponge":
            getSponge()
            break

        default:
            msg.reply("Unknown command... Moron")
            break;
    }
    
    
}

const getSponge = async () => {
    fetch("https://api.fifteen.ai/app/getAudioFile", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
        },
        "referrer": "https://fifteen.ai/app",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "OPTIONS",
        "mode": "cors"
    });
    const response = await fetch("https://api.fifteen.ai/app/getAudioFile", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "access-control-allow-origin": "*",
          "cache-control": "no-cache",
          "content-type": "application/json;charset=UTF-8",
          "pragma": "no-cache",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        "referrer": "https://fifteen.ai/app",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": "{\"text\":\"its ya boi spoonge boob.\",\"character\":\"SpongeBob\",\"emotion\":\"Neutral\"}",
        "method": "POST",
        "mode": "cors"
      });
      
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    await streamPipeline(response.body, fs.createWriteStream('./audio/test2.wav'))
  
}

const sendFile = (msg) => {
    const attachment = new Discord.MessageAttachment("./audio/test.wav")
    msg.channel.send(attachment)
}

module.exports = {
    fifteenHandler
}