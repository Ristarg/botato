const assert = require('assert')
const Discord = require('discord.js')

const Botato = require('../src/botato')

const config = require('./testconfig.json')

describe('E2E tests', function() {
    this.slow(2000)

    const sut = new Botato('t@@')
    const e2e = new Discord.Client()

    before(function(done) {
        this.timeout(5000)
        let otherIsReady = false

        function assertDone() {
            return function() {
                if (otherIsReady)
                    done()
                otherIsReady = true
            }
        }

        sut.on('ready', assertDone(sut))
        e2e.on('ready', assertDone(e2e))

        sut.login(config.sutToken) // tater
        e2e.login(config.e2eToken) // potesto
    })

    after(function() {
        sut.destroy()
        e2e.destroy()
    })

    describe('test wiring', function() {        

        afterEach(function() {
            e2e.removeAllListeners('message')
        })

        it('can receive messages', function(done) {
            sut.once('message', msg => {
                assert.equal(msg.content, 'blah')
                done()
            })

            e2e.channels.get(config.textChannel).send('blah')
        })

        it('can respond to messages', function(done) {
            e2e.on('message', msg => {
                if (msg.author.id !== e2e.user.id) {
                    assert.equal(msg.content, 'pong')
                    done()
                }
            })

            e2e.channels.get(config.textChannel).send('ping')
        })
    })
})