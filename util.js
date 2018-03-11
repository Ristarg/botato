const fs = require('fs')

function log(msg) {
    const outStr = `[${(new Date().toISOString())}] ${msg}`
    console.log(outStr)
    //TODO: log to file
}

//TODO: schema checking maybe?
function assertConfig(path) {
    if (!fs.existsSync(path)) {
        log('Config file not found. Generating...')

        const configTemplate = JSON.stringify({prefix: '', token: ''}, null, 2)
        fs.writeFileSync(path, configTemplate)

        log('Generated an empty config file. Please fill in the provided fields.')
        return false
    }
    return true
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

module.exports = { log, assertConfig, pickRandom }