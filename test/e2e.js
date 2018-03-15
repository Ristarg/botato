const assert = require('assert')
const Discord = require('discord.js')

const Botato = require('../src/botato')

const config = require('./testconfig.json')

describe('E2E tests', function() {
    this.slow(10000)
    this.timeout(0)

    const sut = new Botato('t@@')
    const e2e = new Discord.Client()

    before(function(done) {
        this.timeout(5000)
        let otherIsReady = false

        function assertDone() {
            if (otherIsReady)
                done()
            otherIsReady = true
        }

        sut.on('ready', assertDone)
        e2e.on('ready', assertDone)

        sut.login(config.sutToken) // tater
        e2e.login(config.e2eToken) // potesto
    })

    after(function() {
        sut.destroy()
        e2e.destroy()
    })

    afterEach(function() {
        e2e.removeAllListeners('message')
    })

    describe('test wiring', function() {

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

            e2e.channels.get(config.textChannel).send('t@@sudo ping')
        })
    })

    describe('Question module', function() {
        //FIXME: that's a lotta duplication, just test the plumbing of default handlers and then run all tests with the subcommand
        describe('default handler', function() {
            it('gets a random question from starter deck when called with no args', function(done) {
                e2e.on('message', msg => {
                    if (msg.author.id !== e2e.user.id) {
                        //FIXME: possibly fragile formatting
                        assert.equal(/^:thinking: \| __\*\*starter#[0-9]+\*\*__\n.+$/.test(msg.content), true)
                        done()
                    }
                })

                //TODO: extract prefix to constant
                e2e.channels.get(config.textChannel).send('t@@q')
            })
            
            it('gets a random question from starter deck when called with "starter"', function(done) {
                e2e.on('message', msg => {
                    if (msg.author.id !== e2e.user.id) {
                        //FIXME: possibly fragile formatting
                        assert.equal(/^:thinking: \| __\*\*starter#[0-9]+\*\*__\n.+$/.test(msg.content), true)
                        done()
                    }
                })

                //TODO: extract prefix to constant
                e2e.channels.get(config.textChannel).send('t@@q starter')
            })

            it('gets a random question from deep deck when called with "deep"', function(done) {
                e2e.on('message', msg => {
                    if (msg.author.id !== e2e.user.id) {
                        //FIXME: possibly fragile formatting
                        assert.equal(/^:thinking: \| __\*\*deep#[0-9]+\*\*__\n.+$/.test(msg.content), true)
                        done()
                    }
                })

                //TODO: extract prefix to constant
                e2e.channels.get(config.textChannel).send('t@@q deep')
            })

            it('gets a random question from wyr deck when called with "wyr"', function(done) {
                e2e.on('message', msg => {
                    if (msg.author.id !== e2e.user.id) {
                        //FIXME: possibly fragile formatting
                        assert.equal(/^:thinking: \| __\*\*wyr#[0-9]+\*\*__\n.+$/.test(msg.content), true)
                        done()
                    }
                })

                //TODO: extract prefix to constant
                e2e.channels.get(config.textChannel).send('t@@q wyr')
            })
        })

        describe('"random" handler', function() {
            it('gets a random question from starter deck when called with no args', function(done) {
                e2e.on('message', msg => {
                    if (msg.author.id !== e2e.user.id) {
                        //FIXME: possibly fragile formatting
                        assert.equal(/^:thinking: \| __\*\*starter#[0-9]+\*\*__\n.+$/.test(msg.content), true)
                        done()
                    }
                })

                //TODO: extract prefix to constant
                e2e.channels.get(config.textChannel).send('t@@q random')
            })
            
            it('gets a random question from starter deck when called with "starter"', function(done) {
                e2e.on('message', msg => {
                    if (msg.author.id !== e2e.user.id) {
                        //FIXME: possibly fragile formatting
                        assert.equal(/^:thinking: \| __\*\*starter#[0-9]+\*\*__\n.+$/.test(msg.content), true)
                        done()
                    }
                })

                //TODO: extract prefix to constant
                e2e.channels.get(config.textChannel).send('t@@q random starter')
            })

            it('gets a random question from deep deck when called with "deep"', function(done) {
                e2e.on('message', msg => {
                    if (msg.author.id !== e2e.user.id) {
                        //FIXME: possibly fragile formatting
                        assert.equal(/^:thinking: \| __\*\*deep#[0-9]+\*\*__\n.+$/.test(msg.content), true)
                        done()
                    }
                })

                //TODO: extract prefix to constant
                e2e.channels.get(config.textChannel).send('t@@q random deep')
            })

            it('gets a random question from wyr deck when called with "wyr"', function(done) {
                e2e.on('message', msg => {
                    if (msg.author.id !== e2e.user.id) {
                        //FIXME: possibly fragile formatting
                        assert.equal(/^:thinking: \| __\*\*wyr#[0-9]+\*\*__\n.+$/.test(msg.content), true)
                        done()
                    }
                })

                //TODO: extract prefix to constant
                e2e.channels.get(config.textChannel).send('t@@q random wyr')
            })
        })

        describe('"list" handler', function() {
            it('lists all available decks', function(done) {
                e2e.on('message', msg => {
                    if (msg.author.id !== e2e.user.id) {
                        assert.equal(/starter/.test(msg.content), true)
                        assert.equal(/deep/.test(msg.content), true)
                        assert.equal(/wyr/.test(msg.content), true)
                        done()
                    }
                })

                //TODO: extract prefix to constant
                e2e.channels.get(config.textChannel).send('t@@q list')
            })
        })
    })

    describe('Sudo module', function() {
        describe('"ping" handler', function() {
            it('pongs', function(done) {
                //FIXME: duplicate of "test wiring", but it also belongs here
                e2e.on('message', msg => {
                    if (msg.author.id !== e2e.user.id) {
                        assert.equal(msg.content, 'pong')
                        done()
                    }
                })
    
                e2e.channels.get(config.textChannel).send('t@@sudo ping')
            })
        })
    })
})