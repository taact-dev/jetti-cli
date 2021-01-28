const InstanceUpdateCommand = require('../../utils/commands/instance-update');

class CliCommand extends InstanceUpdateCommand {
    async run() {
        const { flags } = this.parse(this.constructor);
        this.flags = flags;
        this.update({
            resource: 'sales',
        });
    }
}

CliCommand.description = `Update a sale
...
Update a sale
`;

CliCommand.flags = {
    ...InstanceUpdateCommand.flags,
};

module.exports = CliCommand;
