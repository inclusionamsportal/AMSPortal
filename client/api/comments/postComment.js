import axios from './index'

const postComment = (route, data) => axios.post(route, data)

export default postComment
