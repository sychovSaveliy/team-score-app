const apiConfig = {
    protocol: 'http',
    host: 'localhost',
    port: 5000
}

// const apiConfigProd = {
//     protocol: 'https',
//     host: 'sandbbl.pythonanywhere.com',
//     port: 5000
// }

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const getPath = () => IS_DEVELOPMENT ? `${apiConfig.protocol}://${apiConfig.host}:${apiConfig.port}` : '';

export default class {
    static fetch(url, options = {headers: {}}) {
        if (!url) return;
        if (options.body) {
            options.body = JSON.stringify(options.body)
        }
        
        options.headers = options.headers || {};
        options.headers['Content-Type'] = 'application/json';

        let token = localStorage.getItem('jwt');
        options.headers.authorization = token ? `Play ${token}`: '';

        return fetch(`${getPath() + url}`, options).then(resp => resp.json()).catch(console.warn);
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