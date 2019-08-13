import axios from './index'

const updateForm = (route, data) => axios.post(route, data)

export default updateForm
