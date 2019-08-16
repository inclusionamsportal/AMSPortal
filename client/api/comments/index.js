import axios from 'axios'

const instance = axios.create({
  baseURL: '/api/comments'
})

export default instance
