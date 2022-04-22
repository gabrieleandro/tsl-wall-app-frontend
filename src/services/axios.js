import { configure } from 'axios-hooks'
import { Cookies } from 'react-cookie'
import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 1000,
})

// request interceptor to add token to request headers
axios.interceptors.request.use(
  async (config) => {
    const cookies = new Cookies()
    const token = cookies.get('tslwallapp.token')

    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

configure({ axios })
