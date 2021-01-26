const { Command } = require('@oclif/command');
const open = require('open');
const buildUrl = require('build-url');

const { readToken } = require('../../utils/api');

class CliCommand extends Command {
    /* eslint  class-methods-use-this: 0 */
    async run() {
        // Save the token locally
        const { token, host } = readToken();
        const domain = host.includes('localhost')
            ? 'http://localhost:5007'
            : 'https://developers.jetti.io';
        const url = buildUrl(domain, {
            path: 'login',
            queryParams: { token },
        });
        // Open the URL in the defualt browser
        await open(url);
    }
}

CliCommand.description = `Open up the current authenticated user in the developer portal
...
Opens up a new window in the default browser to view the portal for the current logged in token
`;

module.exports = CliCommand;
