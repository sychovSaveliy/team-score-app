const apiConfig = {
    protocol: 'http',
    host: 'localhost',
    port: 5000
}

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const getPath = () => IS_DEVELOPMENT ? `${apiConfig.protocol}://${apiConfig.host}:${apiConfig.port}` : '';

export default class {
    static fetch(url, options) {
        if (!url) return;
        if (options && options.body) {
            options.body = JSON.stringify(options.body)
        }
        return fetch(`${getPath() + url}`, options).then(resp => resp.json());
    }

    static loadConfigs() {
        if (IS_DEVELOPMENT) return;
        fetch('/configs')
            .then(resp => resp.json())
            .then(value => {
                apiConfig.port = value && value.PORT;
            })
            .catch(err => console.warn(err))
    }
}