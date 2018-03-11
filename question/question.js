const { pickRandom } = require('../util')
const fs = require('fs')
const path = require('path')

class Question {
    constructor() {
        this.questions = {}

        const dir = path.join(__dirname, './decks')

        fs.readdirSync(dir).forEach(file => {
            if (file.endsWith('.json')) {
                const name = file.replace('.json', '')
                this.questions[name] = require(path.join(dir, file))
            }
        })
    }

    execute(msg, args) {
        //TODO: show deck and (maybe) question number OR notify on deck miss
        const deck = (args.length > 1 && (args[1] in this.questions)) ? args[1] : 'starter'
        msg.channel.send(pickRandom(this.questions[deck]))
    }
}

module.exports = Question