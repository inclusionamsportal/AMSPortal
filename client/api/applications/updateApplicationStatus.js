import axios from './index'

const updateApplicationStatus = (route, data) => axios.put(route, data)

export default updateApplicationStatus
