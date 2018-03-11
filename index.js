// Discord.js prelude
const Discord = require('discord.js')
const client = new Discord.Client()

// utility prelude
const { log, assertConfig } = require('./util')

// config prelude
const configPath = './config.json'
if (!assertConfig(configPath))
    process.exit(1)
const config = require(configPath)

// modules prelude
const modules = {}
// is it better to load before or after login?
//TODO: automatic module finder
modules.question = new(require('./question/question'))()

//TODO: TESTS TESTS TESTS

client.on('ready', () => {
    log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot)
        return

    const args = msg.content.slice(config.prefix.length).split(' ')
    const command = args[0]

    const matches = Object.keys(modules).filter(m => m.startsWith(command))
    if (matches.length == 1)
        modules[matches[0]].execute(msg, args)
    //TODO: else
})

client.login(config.token)