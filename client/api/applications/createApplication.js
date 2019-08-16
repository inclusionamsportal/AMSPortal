import axios from './index'

const getApplications = (route, data) => axios.post(route, data)

export default getApplications
