const fs = require('fs')
const path = require('path')
const readline = require('readline')

const Discord = require("discord.js")
const client = new Discord.Client()

const config = require('./config.json')

const questions = {}

//TODO: refactor out any command functionality, only leave connection, setup and dispatch
//TODO: if no config exists, generate template config
//TODO: add logging

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)

  questions.starter = require('./questions/starter.json')
  questions.deep = require('./questions/deep.json')
})

client.on('message', msg => {
  if (msg.author.bot || !msg.content.startsWith(config.prefix)) return

  const args = msg.content.slice(config.prefix.length).split(' ')
  const command = args[0]
  if (command === 'question') {
    const deck = (args.length > 1) ? args[1] : 'starter'
    msg.channel.send(questions[deck][Math.floor(Math.random() * questions[deck].length)])
  }
})

client.login(config.token)