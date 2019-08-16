import axios from './index'

const createApplication = (route, data) => axios.post(route, data)

export default createApplication
