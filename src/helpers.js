const jsonfile = require('jsonfile');
const yaml = require('write-yaml');
const yamlReader = require('yaml-reader');

module.exports.setToken = function ({ token, host }) {
    yaml.sync('.jetti.rc.yml', { token, host });
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
