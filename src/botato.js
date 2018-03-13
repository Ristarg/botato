const Discord = require('discord.js')
const { log } = require('./util')

class Botato extends Discord.Client {
    constructor(config) {
        super()

        this.modules = {}
        // is it better to load before or after login?
        //TODO: automatic module finder
        this.modules.question = new(require('./modules/question/question'))()

        this.on('ready', () => {
            log(`Logged in as ${this.user.tag}!`)
        })

        this.on('message', msg => {
            //TEST: allow bot messages in testing environment (for e2e tests)
            if (!msg.content.startsWith(config.prefix) || msg.author.bot)
                return

            const args = msg.content.slice(config.prefix.length).split(' ')

            // unpack the command "frame"
            const command = args[0]
            args.shift()

            //MAYBE: non-contiguous matching?
            const matches = Object.keys(this.modules).filter(m => m.startsWith(command))

            // if input is unambiguous, execute matched command
            if (matches.length == 1)
                this.modules[matches[0]].execute(msg, args)
            //TODO: else
        })
    }
}

module.exports = Botato