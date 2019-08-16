import axios from 'axios'

const instance = axios.create({
  baseURL: '/api/applications'
})

export default instance
