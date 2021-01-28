const { Command, flags: Flags } = require('@oclif/command');

const { throttle } = require('../api');
const prettyjson = require('prettyjson');

class InstanceUpdateCommand extends Command {
    async init() {
        const { flags } = this.parse(InstanceUpdateCommand);
        this.flags = flags;
    }

    async update({ resource }) {
        try {
            const response = await throttle({
                path: `${resource}/${this.flags.id}`,
                method: 'PUT',
                json: JSON.parse(this.flags.json),
            });
            this.log(prettyjson.render(response, {
                indent: 4,
            }));
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

InstanceUpdateCommand.flags = {
    id: Flags.string({
        id: 'ID of the instance',
        required: true,
    }),
    json: Flags.string({
        description: 'JSON data for the update, e.g. { foo: true }',
        required: true,
    }),
};

module.exports = InstanceUpdateCommand;
