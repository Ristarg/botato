const fs = require('fs')
const path = require('path')

const Discord = require('discord.js')
const { log, isDevEnv } = require('./util')

class Botato extends Discord.Client {

    constructor(prefix) {
        super()

        this.modules = {}
        // is it better to load before or after login?
        //TODO: make pretty
        const modulesDir = path.join(__dirname, 'modules')
        fs.readdirSync(modulesDir).forEach(entry => {
            const stats = fs.statSync(path.join(modulesDir, entry))
            if (stats.isDirectory())
            {
                const moduleFile = path.join(modulesDir, entry, entry + '.js')
                if (fs.existsSync(moduleFile))
                    this.modules[entry] = new (require(moduleFile))()
            }
        })        

        this.on('ready', () => {
            log(`Logged in as ${this.user.tag}!`)
        })

        this.on('message', msg => {
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
            {
                this.modules[matches[0]].execute(msg, args)
            }
            else if (matches.length > 1)
            {
                //TODO: pretty formatting
                const matchesStr = matches.map(m => `\t\u2022 __${m.slice(0, command.length)}__${m.slice(command.length)}`).join('\n')
                msg.reply(`I'm not exactly sure what you mean:\n${matchesStr}`)
            }
        })
    }

}

module.exports = Botato