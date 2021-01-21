const { Command, flags } = require('@oclif/command');
const { paginate, throttle } = require('../../utils/api');


const { cli } = require('cli-ux');
const { getFixture } = require('../../helpers');

class CliCommand extends Command {
    async run() {
        const {
            flags: { resource, fixture, force },
        } = this.parse(CliCommand);
        const items = await paginate({
            resource,
            searchParams: {
                attributes: ['id'],
            },
        });
        const json = getFixture({ fixture });
        const rows = Object.entries(json).map(([attribute, value]) => ({ attribute, value }));
        cli.table(rows, {
            attribute: {},
            value: {},
        });
        let execute = force;
        // Check for confirmation
        if (!force) {
            execute = await cli.confirm(`Update ${items.length} ${resource}? Type "yes/no" to continue`);
        }
        if (execute) {
            await Promise.all(
                items.map(async ({ id }) => {
                    const path = [resource, id].join('/');
                    await throttle({
                        path,
                        json,
                        method: 'PUT',
                    });
                    this.log(`Updated data for ${path}`);
                }),
            );
            this.log(`Updated ${items.length} ${resource}`);
        }
    }
}

CliCommand.description = `Batch update a resource in Jetti
...
Batch update resources using a JSON or YAML file
`;

CliCommand.flags = {
    resource: flags.string({
        description: 'resource to update',
        required: true,
    }),
    fixture: flags.string({
        description: 'path to fixture to load, should be in yaml format',
        required: true,
    }),
    force: flags.string({
        description: 'force change without a confirmation',
    }),
};

module.exports = CliCommand;
