import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postBlog = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response
}

const like = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const newBlog = { ...blog, likes: blog.likes + 1 }
  // const newBlog = {
  //   title: blog.title,
  //   author: blog.author,
  //   url: blog.url,
  //   likes: blog.likes + 1,
  //   user: blog.user.id
  // }

  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog, config)
  return response
}

export default { setToken, getAll, postBlog, like }