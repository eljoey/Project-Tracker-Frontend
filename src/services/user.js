import axios from 'axios'

const baseUrl = 'https://lit-bayou-93209.herokuapp.com'

const login = async credentials => {
  const res = await axios.post(`${baseUrl}/login`, credentials)
  return res.data
}

const register = async info => {
  const res = await axios.post(`${baseUrl}/register`, info)
  return res.data
}

export default { login, register }
