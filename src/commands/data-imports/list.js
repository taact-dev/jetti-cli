const { Command, flags } = require('@oclif/command');

const { cli } = require('cli-ux');
const { defaultHost } = require('../../helpers');
const { throttle } = require('../../utils/api');

class CliCommand extends Command {
    async run() {
        const {
            flags: {
                host = defaultHost,
                status = 'complete',
            },
        } = this.parse(CliCommand);
        this.log(`Connected to API ${host}`);
        // Create the user under the API role in the account
        const dataImports = await throttle({
            path: 'data-imports',
            searchParams: {
                limit: 10,
                where: { status },
                order: {
                    attribute: 'createdAt',
                    descending: true,
                },
            },
        });
        cli.table(dataImports, {
            importType: {
                header: 'import type',
            },
            status: {},
            fileUri: {
                header: 'Download',
            },
        });
    }
}

CliCommand.description = `List most recent imports = require(the account
...
List a table of recent data imports = require(Jetti, manually triggered by users
`;

CliCommand.flags = {
    host: flags.string({
        char: 'h',
        description: 'host',
    }),
    status: flags.string({
        char: 's',
        description: 'filter by status',
    }),
};

module.exports = CliCommand;
