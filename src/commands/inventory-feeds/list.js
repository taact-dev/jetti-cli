const { Command, flags } = require('@oclif/command');

const { apiTable } = require('../../helpers');
const { paginate } = require('../../utils/api');

class CliCommand extends Command {
    async run() {
        const {
            flags: {
                dropshipProviderId,
            },
        } = this.parse(CliCommand);
        const where = {};
        if (dropshipProviderId) {
            where.dropshipProviderId = dropshipProviderId;
        }
        const items = await paginate({
            resource: 'inventory-feeds',
            searchParams: {
                where,
                include: [{
                    model: 'DropshipProvider',
                    attributes: [
                        'name',
                    ],
                }],
                attributes: [
                    'id',
                    'name',
                    'resourceType',
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

CliCommand.description = `List inventory feeds in Jetti
...
List a table of the inventory feeds in Jetti
`;

CliCommand.flags = {
    dropshipProvider: flags.string({
        description: 'Filter by dropship provider ID',
    }),
};

module.exports = CliCommand;
