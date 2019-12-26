import axios from 'axios'

const baseUrl = 'http://localhost:3000'

const request = (method, url, data) => {
  return axios({
    method,
    url: baseUrl + url,
    data
  }).then(res => res.data).catch(err => { throw err.response })
}

export const setAuthorizationHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null
}

const api = {
  login(email, password) {
    return request('post', '/login', { email, password })
  },
  fetchBoards() {
    return request('get', '/boards')
  },
  addBoard(title) {
    return request('post', '/boards', { title })
  },
  fetchBoard(id) {
    return request('get', `/boards/${id}`)
  }
}

export default api