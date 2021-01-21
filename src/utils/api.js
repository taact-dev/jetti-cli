const Bottleneck = require('bottleneck');
const got = require('got');
const { stringify } = require('qs');
const urlJoin = require('url-join');
const yamlReader = require('yaml-reader');

// Allow up to 2 calls per second
const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 2000,
});

module.exports.readToken = () => {
    const { token, host } = yamlReader.read('.jetti.rc.yml');
    return { token, host };
};

// Throttle the requests
module.exports.throttle = async ({ method = 'GET', searchParams = {}, path, json }) => {
    const { token, host } = module.exports.readToken();
    const url = urlJoin(host, 'api', [path, 'json'].join('.'));
    const params = stringify(searchParams);
    return limiter.schedule(async () => {
        const { body } = await got({
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'json',
            json,
            method,
            url: [url, params].join('?'),
        });
        return body;
    });
};

module.exports.paginate = async ({ resource }) => {
    let hasMore = true;
    const results = [];
    let from = 0;
    while (hasMore === true) {
        const response = await module.exports.throttle({
            method: 'GET',
            path: resource,
            from,
        });
        results.push(...response);
        hasMore = response.length === 0;
        from += 1;
    }
    return results;
};

module.exports.login = async ({ email, password, host }) => limiter.schedule(async () => {
    const { body } = await got({
        responseType: 'json',
        method: 'POST',
        json: {
            role: 'api',
            email,
            password,
        },
        url: urlJoin(host, 'auth/login'),
    });
    return body;
});
