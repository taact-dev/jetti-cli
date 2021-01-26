const { Command, flags } = require('@oclif/command');

const { apiTable } = require('../../helpers');
const { throttle } = require('../../utils/api');

class CliCommand extends Command {
    /* eslint class-methods-use-this: 0 */
    async run() {
        const items = await throttle({
            path: 'purchases',
            searchParams: {
                limit: 10,
                where: {
                    saleId: {
                        $ne: null,
                    },
                },
                attributes: [
                    'id',
                    'reference',
                ],
                include: [{
                    models: 'DropshipProvider',
                    attributes: [
                        'name',
                    ],
                }],
                order: {
                    attribute: 'createdAt',
                    descending: true,
                },
            },
        });
        apiTable({ items });
    }
}

CliCommand.description = `List most recent exports from the account
...
List a table of recent data exports from Jetti, manually triggered by users
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
