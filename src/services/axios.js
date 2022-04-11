import { configure } from 'axios-hooks'
import { Cookies } from 'react-cookie'
import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 1000,
})

// if (token) {
//   console.log(token)
//   axios.defaults.headers['Authorization'] = `Bearer ${token}`;
// }

configure({ axios })