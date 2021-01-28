const { Command, flags: Flags } = require('@oclif/command');
const { pick } = require('lodash');

const { throttle } = require('../api');
const prettyjson = require('prettyjson');

class InstanceMethodCommand extends Command {
    async init() {
        const { flags } = this.parse(InstanceMethodCommand);
        this.flags = flags;
    }

    async runInstanceMethod({ resource, action, method, json }) {
        try {
            const response = await throttle({
                path: `${resource}/${this.flags.id}/${action}`,
                method,
                json,
            });
            const toRender = this.flags.pick
                ? pick(response, this.flags.pick.split(':'))
                : response;
            this.log(prettyjson.render(toRender, {
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

InstanceMethodCommand.flags = {
    id: Flags.string({
        id: 'ID of the instance',
        required: true,
    }),
    pick: Flags.string({
        id: 'Pick fields in the response',
    }),
};

module.exports = InstanceMethodCommand;
