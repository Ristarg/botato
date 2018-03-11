// Discord.js prelude
const Discord = require("discord.js")
const client = new Discord.Client()

// utility prelude
const { log, assertConfig } = require('./util')

const configPath = './config.json'
if (!assertConfig(configPath))
    process.exit(1)
const config = require(configPath)

// modules prelude
const question = new(require('./question/question'))()

//TODO: TESTS TESTS TESTS

client.on('ready', () => {
    log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot)
        return

    const args = msg.content.slice(config.prefix.length).split(' ')
    const command = args[0]

    //TODO: more general dispatch
    if (command === 'question')
        question.execute(msg, args)
})

client.login(config.token)