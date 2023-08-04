import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

function setToken(newToken) {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = blogId => {
  const config = {
    headers: {Authorization: token}
  }

  const request = axios.delete(`${baseUrl}/delete/${blogId}`, config)
  return request.then(response => response.data)
}





export default { getAll, create, deleteBlog, setToken }