class ModuleBase {
    constructor() {
        // sanity check
        if (new.target === ModuleBase)
            throw new TypeError('Cannot construct ModuleBase instances directly')

        // register command handlers
        this.handlers = Object
            .getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter(it => it !== 'constructor' &&
                !it.startsWith('_')) // don't include ctor and private methods

        this.default = this.handlers[0]
    }

    //TEST: plumbing
    //TODO: permissions checking
    execute(msg, args) {
        //MAYBE: shorthands similar to main dispatcher? some other solution?
        if (args.length > 0 && this.handlers.includes(args[0])) {
            // unpack subframe
            const handler = args[0]
            args.shift()

            this[handler](msg, args)
        } else { // pass everything to default handler
            this[this.default](msg, args)
        }
    }
}

module.exports = ModuleBase