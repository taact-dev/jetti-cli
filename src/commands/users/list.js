const { Command } = require('@oclif/command');

const { apiTable } = require('../../helpers');
const { paginate } = require('../../utils/api');

class CliCommand extends Command {
    static async run() {
        const items = await paginate({
            resource: 'users',
            searchParams: {
                where: {
                    role: {
                        $notIn: [
                            'dropship_provider',
                            'reseller',
                        ],
                    },
                },
                attributes: [
                    'id',
                    'email',
                    'firstName',
                    'lastName',
                    'role',
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

CliCommand.description = `List users in Jetti
...
List a table of the users in Jetti
`;

module.exports = CliCommand;
