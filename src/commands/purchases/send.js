const InstanceMethodCommand = require('../../utils/commands/instance-method');

class CliCommand extends InstanceMethodCommand {
    async run() {
        const { flags } = this.parse(this.constructor);
        this.flags = flags;
        this.runInstanceMethod({
            resource: 'purchases',
            action: 'send',
            method: 'PUT',
            json: {
                errorNotification: false,
            },
        });
    }
}

CliCommand.description = `Generate rates for a dropship purchase order
...
Return a list of rates for a dropship purchase order from the rates.json endpoint
`;

CliCommand.flags = {
    ...InstanceMethodCommand.flags,
};

module.exports = CliCommand;
