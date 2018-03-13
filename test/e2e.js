const assert = require('assert')
const Discord = require('discord.js')

const config = require('./testconfig.json')

describe('E2E tests', function () {
    const sut = new Discord.Client()
    const e2e = new Discord.Client()

    before(function (done) {
        let otherIsReady = false

        function assertDone() {
            return function () {
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

    describe('test wiring', function () {

        it('can receive messages', function (done) {
            sut.on('message', msg => {
                assert.equal(msg.content, 'ping')
                done()
            })

            e2e.channels.get(config.textChannel).send('ping')
        })

    })
})