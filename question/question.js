const { pickRandom } = require('../util')
const fs = require('fs')
const path = require('path')

class Question {
    constructor() {
        this.questions = {}

        const dir = path.join(__dirname, './decks')

        fs.readdirSync(dir).forEach(file => {
            //TODO: check if is a dir
            //TODO: validate JSON, handle malformed JSON
            if (file.endsWith('.json')) {
                const name = file.replace('.json', '')
                this.questions[name] = require(path.join(dir, file))
            }
        })
    }

    execute(msg, args) {
        //TODO: get question by keyword
        //TODO: get question by index
        //TODO: notify on deck miss?
        const deck = (args.length > 1 && (args[1] in this.questions)) ? args[1] : 'starter'
        const [question, idx] = pickRandom(this.questions[deck])
        const out = `:thinking: | __**${deck}#${idx}**__\n${question}`
        msg.channel.send(out)
    }
}

module.exports = Question