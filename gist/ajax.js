const request = (method, url, data, config = {}) => {
  const options = Object.assign({}, config, {
    url,
    method,
    data
  })
  options.headers = options.headers || {}
  return new Promise((resolve, reject) => {
    window.axios.request(options)
      .then(res => {
        if (res) {
          resolve(res.data)
        }
      }).catch(res => {
        reject(res)
      })
  })
}

export const ajax = {
  get(url, config) {
    return request('get', url, null, config)
  },
  delete(url, config) {
    return request('delete', url, null, config)
  },
  head(url, config) {
    return request('head', url, null, config)
  },
  post(url, data, config) {
    return request('post', url, data, config)
  },
  put(url, data, config) {
    return request('put', url, data, config)
  },
  patch(url, data, config) {
    return request('path', url, data, config)
  }
}

export const formatURL = (url, name, val) => {
  return url.replace(`{${name}}`, val)
}
