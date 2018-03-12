const fs = require('fs')
const path = require('path')

const ModuleBase = require('../modulebase')
const { pickRandom } = require('../../util')

class Question extends ModuleBase {
    constructor() {
        super()
        this.decks = {}

        const dir = path.join(__dirname, './decks')

        fs.readdirSync(dir).forEach(file => {
            //TODO: check if is a dir
            //TODO: validate JSON, handle malformed JSON
            if (file.endsWith('.json')) {
                const name = file.replace('.json', '')
                this.decks[name] = require(path.join(dir, file))
            }
        })
    }

    random(msg, args) {
        //TODO: usage cooldown
        //TODO: guarantee of not repeating questions
        //TODO: get question by keyword
        //TODO: get question by index
        //TODO: notify on deck miss?
        const deck = (args.length > 1 && (args[1] in this.decks)) ? args[1] : 'starter'
        const [question, idx] = pickRandom(this.decks[deck])
        const out = `:thinking: | __**${deck}#${idx}**__\n${question}`
        msg.channel.send(out)
    }
}

module.exports = Question