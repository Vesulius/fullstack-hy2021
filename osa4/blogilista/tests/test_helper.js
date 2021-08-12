const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    user: '6112585d3d87475da212a5c4',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    user: '6112585d3d87475da212a5c4',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    user: '6112585d3d87475da212a5c4',
    likes: 12
  }
]

const newBlog = {
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  user: '6112585d3d87475da212a5c4',
  likes: 10
}

const blogWithoutLikes = {
  title: 'Test blog without likes',
  author: 'Tester',
  user: '6112585d3d87475da212a5c4',
  url: 'https://static6.depositphotos.com/1155356/659/i/950/depositphotos_6596878-stock-photo-construction-worker-with-ladder.jpg'
}

const blogWithoutTitleAndUrl = {
  author: 'Im no writer',
  user: '6112585d3d87475da212a5c4'
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs,
  newBlog,
  blogWithoutLikes,
  blogWithoutTitleAndUrl,
  blogsInDb
}