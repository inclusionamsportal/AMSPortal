import axios from './index'

const updateForm = (route, data) => axios.put(route, data)

export default updateForm
