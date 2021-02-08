const InstanceMethodCommand = require('../../utils/commands/instance-method');

class CliCommand extends InstanceMethodCommand {
    async run() {
        const { flags } = this.parse(this.constructor);
        this.flags = flags;
        this.runInstanceMethod({
            resource: 'purchases',
            action: 'default-label',
            method: 'PUT',
        });
    }
}

CliCommand.description = `Generate a label using the default rate
...
Generate a label using the default rate`;

CliCommand.flags = {
    ...InstanceMethodCommand.flags,
};

module.exports = CliCommand;
