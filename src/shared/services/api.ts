import axios from 'axios'
const API_URL = 'https://dev.codeleap.co.uk/'

const api = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  baseURL: API_URL,
})

export { api }
