const fs = require('fs')
const path = require('path')
const readline = require('readline')

const Discord = require("discord.js")
const client = new Discord.Client()

const token = 'NDE2MTAwMDQ1NDY1NzE0Njg4.DYJQyQ.AsCItJ0AxCaIhTlX15tLq-yCFws'
const prefix = 'b@@'

const questions = {}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)

  questions.deep = []

  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, '/questions/deep.txt')),
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    questions.deep.push(line);
  })
})

client.on('message', msg => {
  if (msg.author.bot || !msg.content.startsWith(prefix)) return

  const command = msg.content.slice(3);
  if (command === 'question') {
    msg.channel.send(questions.deep[Math.floor(Math.random() * questions.deep.length)])
  }
})

client.login(token)