const Discord = require('discord.js')
const { log, isDevEnv } = require('./util')

class Botato extends Discord.Client {
    constructor(prefix) {
        super()

        this.modules = {}
        // is it better to load before or after login?
        //TODO: automatic module finder
        this.modules.question = new(require('./modules/question/question'))()

        this.on('ready', () => {
            log(`Logged in as ${this.user.tag}!`)
        })

        this.on('message', msg => {

            //FIXME: this probably shouldn't be here
            if (msg.content === 'ping')
                msg.channel.send('pong')

            if (!msg.content.startsWith(prefix) || msg.author.bot && !isDevEnv)
                return

            const args = msg.content.slice(prefix.length).split(' ')

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