import { Command, flags } from '@oclif/command';
import { defaultHost, setToken } from '../../helpers';

import cli from 'cli-ux';
import { login } from '../../utils/api';

class CliCommand extends Command {
    async run() {
        let {
            flags: { email, password, host },
        } = this.parse(CliCommand);
        if (!host) {
            host = defaultHost;
        }
        this.log(`Connected to API ${host}`);
        // Fetch the email if it has not yet been captured
        if (!email) {
            email = await cli.prompt('What is your login email?');
        }
        // Fetch the password if it has not yet been captured
        if (!password) {
            password = await cli.prompt('What is your login password?', {
                type: 'hide',
            });
        }
        // Login and set the token
        const { token } = await login({ email, password, host });
        this.log(`Successfully logged in as ${email} on host ${host}`);
        setToken({ token, host });
    }
}

CliCommand.description = `Login to your Jetti account
...
You'll require the email and password for your Jetti account
`;

CliCommand.flags = {
    email: flags.string({
        char: 'e',
        description: 'login email',
    }),
    password: flags.string({
        char: 'p',
        description: 'login password',
    }),
    host: flags.string({
        char: 'h',
        description: 'host',
    }),
};

module.exports = CliCommand;
