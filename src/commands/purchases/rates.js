const { Command, flags } = require('@oclif/command');

const { throttle } = require('../../utils/api');
const prettyjson = require('prettyjson');

class CliCommand extends Command {
    async run() {
        const {
            flags: { id },
        } = this.parse(CliCommand);
        try {
            const response = await throttle({
                path: `purchases/${id}/rates`,
                method: 'POST',
            });
            this.log(response);
        } catch (err) {
            if (err.problem) {
                this.log(prettyjson.render(err.problem, {
                    indent: 4,
                }));
                this.error(err.title);
            } else {
                throw err;
            }
        }
    }
}

CliCommand.description = `List most recent imports = require(the account
...
List a table of recent data imports = require(Jetti, manually triggered by users
`;

CliCommand.flags = {
    id: flags.string({
        description: 'ID of the purchase to generate rates for',
        required: true,
    }),
};

module.exports = CliCommand;
