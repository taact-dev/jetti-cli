import { Command, flags } from '@oclif/command';
import { defaultHost, setToken } from '../../helpers';

import cli from 'cli-ux';
import { throttle } from '../../utils/api';

class CliCommand extends Command {
    async run() {
        let {
            flags: { email, host },
        } = this.parse(CliCommand);
        if (!host) {
            host = defaultHost;
        }
        this.log(`Connected to API ${host}`);
        // Fetch the email if it has not yet been captured
        if (!email) {
            email = await cli.prompt('Email for developer notifications');
        }
        // Create the user under the API role in the account
        const { token } = await throttle({
            path: 'users',
            json: {
                email,
                role: 'api',
            },
            method: 'POST',
        });
        this.log(`A new API token has been provisioned for ${email} on host ${host}.`, { token });
        this.log('You are now using this new token for any CLI action / API authentication');
        // Save the token locally
        setToken({ token, host });
    }
}

CliCommand.description = `Create a new API user / token for API authentication or CLI usage
...
This will add a new API user to your account and generate an API token. You'll be logged out of your current session.
`;

CliCommand.flags = {
    email: flags.string({
        char: 'e',
        description: 'login email',
    }),
    host: flags.string({
        char: 'h',
        description: 'host',
    }),
};

module.exports = CliCommand;
