const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }
]

const newBlog = {
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10
}

const blogWithoutLikes = {
  title: 'Test blog without likes',
  author: 'Tester',
  url: 'https://static6.depositphotos.com/1155356/659/i/950/depositphotos_6596878-stock-photo-construction-worker-with-ladder.jpg'
}

const blogWithoutTitleAndUrl = {
  author: 'Im no writer'
}

const getUserToken = async () => {
  const user = await User.findOne({})
  const userInf = {
    username: user.username,
    id: user.id
  }
  const token = `Bearer ${jwt.sign(userInf, process.env.SECRET)}`
  return token
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const nonexistingId = async () => {
  const blog = new Blog({ author: 'test', url: 'test', title: 'test' })
  await blog.save()
  await blog.remove()
  return blog.id
}

module.exports = {
  initialBlogs,
  newBlog,
  blogWithoutLikes,
  blogWithoutTitleAndUrl,
  getUserToken,
  blogsInDb,
  nonexistingId
}