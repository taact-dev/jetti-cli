const { Command, flags } = require('@oclif/command');

const { apiTable } = require('../../helpers');
const { throttle } = require('../../utils/api');

class CliCommand extends Command {
    async run() {
        const {
            flags: {
                status = 'complete',
            },
        } = this.parse(CliCommand);
        const items = await throttle({
            path: 'data-imports',
            searchParams: {
                limit: 10,
                where: { status },
                attributes: [
                    'importType',
                    'status',
                    'fileUri',
                ],
                order: {
                    attribute: 'createdAt',
                    descending: true,
                },
            },
        });
        apiTable({ items });
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
