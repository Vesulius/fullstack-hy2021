const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({}).populate('user', { blogs: 0 })
    .then(blogs => {
      response.json(blogs.map(b => b.toJSON()))
    })
    .catch(error => next(error))
})

// blogsRouter.post('/', (request, response, next) => {
//   const body = request.body
//   User
//     .findOne({})
//     .then(user => {
//       const blog = new Blog({
//         title: body.title,
//         author: body.author,
//         url: body.url,
//         likes: !body.likes ? 0 : body.likes,
//         user
//       })
//       return blog
//     })
//     .then(result => { return result.save() })
//     .then(result => { return response.status(201).json(result) })
//     .catch(error => next(error))
// })

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: !body.likes ? 0 : body.likes,
    user
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).json(result)
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
    response.json(updatedBlog)
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter