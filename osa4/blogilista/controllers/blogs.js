const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({}).populate('user', { blogs: 0 })
    .then(blogs => {
      response.json(blogs.map(b => b.toJSON()))
    })
    .catch(error => next(error))
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!request.token || !request.user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: !body.likes ? 0 : body.likes,
    user: user.id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (blogToDelete && blogToDelete.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'users can only delete their blogs' })
  }
  await Blog.findByIdAndRemove(request.params.id)
  return response.status(204).end()
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
  response.json(updatedBlog)
})

module.exports = blogsRouter