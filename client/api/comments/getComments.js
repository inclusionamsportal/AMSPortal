import axios from './index'

const getComments = route => axios.get(route)

export default getComments
