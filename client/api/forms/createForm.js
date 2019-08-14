import axios from './index'

const createForm = (route, data) => axios.post(route, data)

export default createForm
