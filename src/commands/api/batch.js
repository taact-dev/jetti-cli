import { Command, flags } from '@oclif/command';
import { paginate, throttle } from '../../utils/api';

import cli from 'cli-ux';
import { getFixture } from '../../helpers';

class CliCommand extends Command {
    async run() {
        const {
            flags: { resource, fixture },
        } = this.parse(CliCommand);
        const items = await paginate({
            resource,
            searchParams: {
                attributes: ['id'],
            },
        });
        const json = getFixture({ fixture });
        this.log(`Updating ${items.length} ${resource}`);
        const rows = Object.entries(json).map(([attribute, value]) => ({ attribute, value }));
        cli.table(rows, {
            attribute: {},
            value: {},
        });
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

CliCommand.description = `Batch update a resource in Jetti
...
Batch update resources using a JSON or YAML file
`;

CliCommand.flags = {
    resource: flags.string({
        char: 're',
        description: 'resource to update',
        required: true,
    }),
    fixture: flags.string({
        char: 'f',
        description: 'path to fixture to load, should be in yaml format',
        required: true,
    }),
};

module.exports = CliCommand;
