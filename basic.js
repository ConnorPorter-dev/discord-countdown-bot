
const coundownHandler = (msg, command) => {
    switch (command[1]){
        // Test command
        case "hello":
        //   state++
          msg.channel.send("Hello There")
          break
    
        case "newgame":
          msg.reply("starting a new game of Countdown!")
          break
    
        case "vowel":
          msg.channel.send(getVowel())
          break
    
        case "cons":
          console.log(command[0])
          msg.channel.send(getConst())
          break
      }
}

// Do I need this?
const nextLetter = () => {

}


// TODO: Commands that can be accessed in game


// Returns a vowel
const getVowel = () => {
const vowels = "aeiou"
return randomLetter(vowels)
}

// Returns an constonant
const getConst = () => {
const constonants = "bcdfghjklmnpqrstvwxyz"
return "b"
}

// Takes a string and returns a random letter of that string
const randomLetter = (string) => {
return string.charAt(Math.floor(Math.random() * Math.floor(string.length)))
}

// Create a new game of countdown!
const newGame = () => {
    // Welcome to Countdown
    let letters = []
    for (let index = 0; index < 6; index++) {
        // ask if vowel or const
        let newLetter
        if (request == "v" || request == "vowel") {
            newLetter = getVowel()
        } 
        if (request == "c" || request == "const") {
            newLetter = getConst()    
        }
    }
}
  
module.exports = {
    coundownHandler
}