const { Command, flags } = require('@oclif/command');

const { throttle } = require('../../utils/api');

class CliCommand extends Command {
    async run() {
        const {
            flags: { email, role },
        } = this.parse(CliCommand);
        const user = await throttle({
            path: 'users',
            json: { email, role },
            method: 'POST',
        });
        this.log(`Create user ${user.email}, an invite has been sent to access their Jetti dashboard`);
    }
}

CliCommand.description = `Batch update a resource in Jetti
...
Batch update resources using a JSON or YAML file
`;

CliCommand.flags = {
    email: flags.string({
        char: 'e',
        description: 'email',
        default: 'admin',
        required: true,
    }),
    role: flags.string({
        char: 'e',
        description: 'email',
        required: true,
    }),
    password: flags.string({
        char: 'e',
        description: 'email',
        required: true,
    }),
};

module.exports = CliCommand;
