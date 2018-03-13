const path = require('path')

const Discord = require('discord.js')
const client = new Discord.Client()

const { log, assertConfig } = require('./util')

//FIXME: possibly fragile path resolution
const configPath = path.resolve('./config.json')
if (!assertConfig(configPath))
    process.exit(1)
const config = require(configPath)

const modules = {}
// is it better to load before or after login?
//TODO: automatic module finder
modules.question = new(require('./modules/question/question'))()

//TEST: TESTS TESTS TESTS

client.on('ready', () => {
    log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    //TEST: allow bot messages in testing environment (for e2e tests)
    if (!msg.content.startsWith(config.prefix) || msg.author.bot)
        return

    const args = msg.content.slice(config.prefix.length).split(' ')

    // unpack the command "frame"
    const command = args[0]
    args.shift()

    //MAYBE: non-contiguous matching?
    const matches = Object.keys(modules).filter(m => m.startsWith(command))

    // if input is unambiguous, execute matched command
    if (matches.length == 1)
        modules[matches[0]].execute(msg, args)
    //TODO: else
})

client.login(config.token)