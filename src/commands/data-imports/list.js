import { Command, flags } from '@oclif/command';

import cli from 'cli-ux';
import { defaultHost } from '../../helpers';
import { throttle } from '../../utils/api';

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

CliCommand.description = `List most recent imports from the account
...
List a table of recent data imports from Jetti, manually triggered by users
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
