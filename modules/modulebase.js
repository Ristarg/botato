class ModuleBase {
    constructor() {
        // sanity check
        if (new.target === ModuleBase)
            throw new TypeError('Cannot construct ModuleBase instances directly')

        // get command handlers
        this.handlers = Object
            .getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter(it => it !== 'constructor' &&
                !it.startsWith('_')) // don't include ctor and private methods
    }

    execute(msg, args) {
        // TODO: get default handler from module ctor instead of hardcoded
        const subcommand = (args.length > 1) ? args[1] : 'default'
        const matches = this.handlers.filter(m => m.startsWith(subcommand))

        if (matches.length == 1)
            this[matches[0]](msg, args)
        //TODO: else
    }
}

module.exports = ModuleBase