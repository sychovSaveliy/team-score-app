/*const apiConfig = {
    protocol: 'http',
    host: 'localhost',
    port: 5000
}*/

const apiConfig = {
    protocol: 'https',
    host: 'sandbbl.pythonanywhere.com',
    port: ''
}

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const getPath = () => IS_DEVELOPMENT ? `${apiConfig.protocol}://${apiConfig.host}:${apiConfig.port}` : 'https://sandbbl.pythonanywhere.com';

export default class {
    static fetch(url, options = {headers: {}}) {
        if (!url) return;
        if (options.body) {
            options.body = JSON.stringify(options.body)
        }
        
        options.headers = options.headers || {};
        options.headers['Content-Type'] = 'application/json';
        //options.mode = 'no-cors';

        let token = window.localStorage.getItem('jwt');
        console.log('options.headers.authorization',options.headers.authorization)
        if (options.headers.authorization === undefined) {
            options.headers.authorization = token ? `Play ${token}`: '';
        }

      return new Promise((resolve, reject) => {
        fetch(`${getPath() + url}`, options)
          .then(response => {
            console.log('response', response)
            if (response.status < 400) {
              return response.json();
            } else {
              throw response;
            }
          })
          .then(data => {
            console.log('data', data)
            resolve(data);
          })
          .catch(response => {
            console.log('response', response)
            console.log('response.json()', response.json())
            reject(response.statusText)
          })
        })
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

    static setToken(value) {
        value ? window.localStorage.setItem("jwt", value) : window.localStorage.removeItem("jwt")
    }
}
