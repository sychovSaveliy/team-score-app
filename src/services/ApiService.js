const apiConfig = {
    protocol: 'http',
    host: 'localhost',
    port: '5000'
}

const getPath = () => `${apiConfig.protocol}://${apiConfig.host}:${apiConfig.port}`;

export default class {
    static fetch(url, options) {
        if (!url) return;
        if (options && options.body) {
            options.body = JSON.stringify(options.body)
        }
        return fetch(`${getPath() + url}`, options).then(resp => resp.json());
    }
}