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

        this.default = this.handlers[0]
    }

    execute(msg, args) {
        const subcommand = (args.length > 1) ? args[1] : this.default
        const matches = this.handlers.filter(m => m.startsWith(subcommand))

        if (matches.length == 1)
            this[matches[0]](msg, args)
        //TODO: else
    }
}

module.exports = ModuleBase