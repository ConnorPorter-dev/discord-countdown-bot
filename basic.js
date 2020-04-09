const getVowel = () => {
    const vowels = "aeiou"
    return "a"
}

const getConst = () => {
    const constonants = "bcdfghjklmnpqrstvwxyz"
    return "b"
}

const newGame = () => {
    // Welcome to Countdown
    let letters = []
    for (let index = 0; index < 6; index++) {
        // ask if vowel or const
        
        let newLetter
        if (request == "v" || request == "vowel") {
            newLetter = getVowel()
        } if (request == "v" || request == "const") {
            newLetter = getConst()    
        }
    }
}

// Do I need this?
const nextLetter = () => {

}