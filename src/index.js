const path = require('path')

const Botato = require('./botato')
const { assertConfig } = require('./util')

//FIXME: possibly fragile path resolution
const configPath = path.resolve('./config.json')
if (!assertConfig(configPath))
    process.exit(1)
const config = require(configPath)

const client = new Botato(config)

//TEST: TESTS TESTS TESTS

client.login(config.token)