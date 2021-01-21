import jsonfile from 'jsonfile';
import yaml from 'write-yaml';
import yamlReader from 'yaml-reader';

export function setToken({ token, host }) {
    yaml.sync('.jetti.rc.yml', { token, host });
}

export function getFixture({ fixture }) {
    if (fixture.endsWith('.yml') || fixture.endsWith('.yaml')) {
        return yamlReader.read(fixture);
    }
    if (fixture.endsWith('.json')) {
        return jsonfile.readFileSync(fixture);
    }
    throw new Error('File must be a .json, .yml or .yaml');
}

export const defaultHost = process.env.API_HOST || 'https://api.jetti.io';
