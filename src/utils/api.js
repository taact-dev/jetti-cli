import Bottleneck from 'bottleneck';
import got from 'got';
import { stringify } from 'qs';
import urlJoin from 'url-join';
import yamlReader from 'yaml-reader';

// Allow up to 2 calls per second
const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 2000,
});

export function readToken() {
    const { token, host } = yamlReader.read('.jetti.rc.yml');
    return { token, host };
}

// Throttle the requests
export async function throttle({ method = 'GET', searchParams = {}, path, json }) {
    const { token, host } = readToken();
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
}

export async function paginate({ resource }) {
    let hasMore = true;
    const results = [];
    let from = 0;
    while (hasMore === true) {
        const response = await throttle({
            method: 'GET',
            path: resource,
            from,
        });
        results.push(...response);
        hasMore = response.length === 0;
        from += 1;
    }
    return results;
}

export async function login({ email, password, host }) {
    return limiter.schedule(async () => {
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
}
