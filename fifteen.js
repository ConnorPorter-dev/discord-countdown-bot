const Discord = require('discord.js')
const fs = require('fs')
const util = require('util')
const stream = require('stream');


const fetch = require('node-fetch')
const streamPipeline = util.promisify(stream.pipeline)

const fifteenHandler = (msg, command) => {
    let unfilteredText = ""
    command.forEach((word, index) => {
        if (index > 1) {
            unfilteredText += word + " "
        }
    })
    const messageToSend = unfilteredText.replace(/[^A-Z _.,!?:]/gi, '')

    // console.log(unfilteredText);
    // console.log(messageToSend);
    
    if (messageToSend.length > 200) {
        msg.reply("Message too long, keep under 200 characters")
        return
    }
    switch (command[1]) {
        case "test":
            sendFile(msg)
            break;
    
        case "sponge":
            getSponge(msg, messageToSend)
            break

        default:
            msg.reply("Unknown command... Moron")
            break;
    }
    
    
}

const getSponge = async (msg, message) => {
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
        "body": `{\"text\":\"${message}\",\"character\":\"SpongeBob\",\"emotion\":\"Neutral\"}`,
        "method": "POST",
        "mode": "cors"
      });
      
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    await streamPipeline(response.body, fs.createWriteStream('./audio/test3.wav'))
    console.log("File Created");
    sendFile(msg)
}

const sendFile = (msg) => {
    const attachment = new Discord.MessageAttachment("./audio/test3.wav", "The Sponge Prophesy.wav")
    msg.channel.send(attachment)
}

module.exports = {
    fifteenHandler
}