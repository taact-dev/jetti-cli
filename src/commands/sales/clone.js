const { flags: Flags } = require('@oclif/command');
const InstanceMethodCommand = require('../../utils/commands/instance-method');

class CliCommand extends InstanceMethodCommand {
    async run() {
        const { flags } = this.parse(this.constructor);
        this.flags = flags;
        this.runInstanceMethod({
            resource: 'sales',
            action: 'clone',
            method: 'POST',
            json: {
                cloneShippingRates: true,
            },
        });
    }
}

CliCommand.description = `Clone a sale
...
Clones a sale, setting a return reason. Usually for a custom exchange
`;

CliCommand.flags = {
    ...InstanceMethodCommand.flags,
    exchangeReason: Flags.string({
        description: 'Clone reason for the sale',
        options: ['exchange', 'new_sale'],
    }),
};

module.exports = CliCommand;
