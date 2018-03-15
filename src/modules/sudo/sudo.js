const ModuleBase = require('../modulebase')

class Sudo extends ModuleBase {
    ping(msg) {
        msg.channel.send('pong')
    }
}

module.exports = Sudo