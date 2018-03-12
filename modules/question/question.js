const fs = require('fs')
const path = require('path')

const ModuleBase = require('../modulebase')
const { pickRandom } = require('../../util')

class Question extends ModuleBase {
    constructor() {
        super()
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

    default(msg, args) {
        //TODO: usage cooldown
        //TODO: guarantee of not repeating questions
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