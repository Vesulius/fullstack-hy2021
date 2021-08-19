import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const config = () => {
  return token
    ? { headers: { Authorization: token } }
    : null
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postBlog = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, config())
  return response
}

const like = async blog => {
  const newBlog = { ...blog, likes: blog.likes + 1 }
  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog, config())
  return response
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, config())
  return response
}

export default { setToken, getAll, postBlog, like, remove }