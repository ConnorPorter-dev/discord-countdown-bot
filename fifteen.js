const Discord = require('discord.js')
const fs = require('fs')
const util = require('util')
const fetch = require('node-fetch')
const stream = require('stream')
const streamPipeline = util.promisify(stream.pipeline)

const audioDir = "./audio"
const apiEndpoint = "https://api.15.ai/app/getAudioFile"

// Handles all fifteen.ai commands
const fifteenHandler = (msg, command) => {
    let unfilteredText = ""

    // Builds the message to send
    command.forEach((word, index) => {
        if (index > 1) {
            unfilteredText += word + " "
        }
    })
    const messageToSend = unfilteredText.replace(/[^A-Z _.,!?:]/gi, '')

    if (messageToSend.length > 280) {
        msg.reply("Message too long, keep under 280 characters")
        return
    }
    switch (command[1]) {
        case "list":
            msg.channel.send("List of characters: spongebob, glados, soldier, doctor, announcer, wheatley, portalturret, narrator")
            msg.channel.send("Any other character on 15.ai can be added, just ask")
            break;
        // TODO: TURN ALL THESE INTO A HASHMAP FOR MAINTAINABILITY
        case "spongebob":
            generateAudio(msg, messageToSend, "SpongeBob SquarePants")
            break
        case "glados":
            generateAudio(msg, messageToSend, "GLaDOS")
            break
        case "soldier":
            generateAudio(msg, messageToSend, "Soldier")
            break
        case "doctor":
            generateAudio(msg, messageToSend, "Tenth Doctor")
            break
        case "announcer":
            generateAudio(msg, messageToSend, "Announcer")
            break
        case "wheatley":
            generateAudio(msg, messageToSend, "Wheatley")
            break
        case "portalturret":
            generateAudio(msg, messageToSend, "Sentry Turret")
            break
        case "narrator":
            generateAudio(msg, messageToSend, "The Narrator")
            break
        default:
            msg.reply("Unknown command... Moron")
            break;
    }
}

// Requests audio from api and saves file locally
const generateAudio = async (msg, message, character) => {
    fetch(apiEndpoint, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
        },
        "referrer": "https://fifteen.ai/",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "OPTIONS",
        "mode": "cors"
    });
    const response = await fetch(apiEndpoint, {
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
        "referrer": "https://15.ai/",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": `{\"text\":\"${message}\",\"character\":\"${character}\",\"emotion\":\"Contextual\",\"use_diagonal\":true}`,
        "method": "POST",
        "mode": "cors"
    });

    if (!response.ok) {
        msg.channel.send("There's been an error because the developer is incompetent")
        throw new Error(`unexpected response ${response.statusText}`)
    }
    await streamPipeline(response.body, fs.createWriteStream(`${audioDir}/${msg.author.id}.wav`))
    console.log("File Created");
    sendFile(msg)
}

// Sends the file on Discord and then removes the local file
const sendFile = async (msg) => {
    const attachment = new Discord.MessageAttachment(`${audioDir}/${msg.author.id}.wav`, "15ai.wav")
    await msg.channel.send(attachment)
    fs.unlink(`${audioDir}/${msg.author.id}.wav`, (err) => {
        if (err) throw err;
    })
}

module.exports = {
    fifteenHandler
}