const jsonfile = require('jsonfile');
const yaml = require('write-yaml');
const yamlReader = require('yaml-reader');
const { cli } = require('cli-ux');
const { underscored } = require('underscore.string');
const flat = require('flat');

module.exports.setToken = function ({ token, host }) {
    yaml.sync('.jetti.rc.yml', { token, host });
};

module.exports.apiTable = function ({ items }) {
    const flattened = items.map(item => flat(item));
    cli.table(flattened, Object.keys(flattened[0]).reduce((obj, key) => ({
        ...obj,
        [key]: {
            header: underscored(key),
        },
    }), {}));
};

module.exports.getFixture = function ({ fixture }) {
    if (fixture.endsWith('.yml') || fixture.endsWith('.yaml')) {
        return yamlReader.read(fixture);
    }
    if (fixture.endsWith('.json')) {
        return jsonfile.readFileSync(fixture);
    }
    throw new Error('File must be a .json, .yml or .yaml');
};

module.exports.defaultHost = process.env.API_HOST || 'https://api.jetti.io';
