class Question {
    constructor() {
        this.questions = {}

        //TODO: more general loader
        this.questions.starter = require('./decks/starter.json')
        this.questions.deep = require('./decks/deep.json')
    }

    execute(msg, args) {
        const deck = (args.length > 1) ? args[1] : 'starter'
        msg.channel.send(this.questions[deck][Math.floor(Math.random() * this.questions[deck].length)])
    }

}

module.exports = Question