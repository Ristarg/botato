const fs = require('fs')

function log(msg) {
    const outStr = `[${(new Date().toISOString())}] ${msg}`
    console.log(outStr)
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

module.exports = { log, assertConfig }