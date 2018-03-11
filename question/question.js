const { pickRandom } = require('../util')

class Question {
    constructor() {
        this.questions = {}

        //TODO: more general loader
        this.questions.starter = require('./decks/starter.json')
        this.questions.deep = require('./decks/deep.json')
    }

    execute(msg, args) {
        const deck = (args.length > 1) ? args[1] : 'starter'
        msg.channel.send(pickRandom(this.questions[deck]))
    }
}

module.exports = Question