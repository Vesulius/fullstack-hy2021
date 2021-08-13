const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const testUser = new User({
    username: 'tester',
    password: 'password1'
  })
  const user = await testUser.save()

  // testuser id needs to be 'manually' mapped to blogs as they are put directly into the db and not through blogs controller
  helper.initialBlogs.forEach(b => b.user = user.id)
  await Blog.insertMany(helper.initialBlogs)
})

describe('returning blogs', () => {
  test('all blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog id is named "id" not "_id"', async () => {
    const response = await api
      .get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('posting blogs', () => {
  test('bad token return error code 401', async () => {
    const badToken = 'Loremipsumdolorsitamet,consecteturadipiscingelit,seddoeiusmodtemporincididuntutlaboreetdoloremagnaaliqua'
    await api
      .post('/api/blogs')
      .set({ 'authorization': badToken })
      .send(helper.newBlog)
      .expect(401)
  })

  test('blog added to db', async () => {
    const token = await helper.getUserToken()
    await api
      .post('/api/blogs')
      .set({ 'authorization': token })
      .send(helper.newBlog)
      .expect(201)

    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const allTitles = allBlogs.map(b => b.title)
    expect(allTitles).toContain('First class tests')
  })

  test('blog without likes values gives blog zero likes', async () => {
    const token = await helper.getUserToken()
    await api
      .post('/api/blogs')
      .set({ 'authorization': token })
      .send(helper.blogWithoutLikes)
      .expect(201)

    const allBlogs = await helper.blogsInDb()
    const postedBlog = allBlogs.find(b => b.title === 'Test blog without likes')
    expect(postedBlog.likes).toBe(0)
  })

  test('blog without required content fails with code 400', async () => {
    const token = await helper.getUserToken()
    await api
      .post('/api/blogs')
      .set({ 'authorization': token })
      .send(helper.blogWithoutTitleAndUrl)
      .expect(400)

    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting blogs', () => {
  test('valid id deletes blog with code 204', async () => {
    const allBlogsAtStart = await helper.blogsInDb()
    const toBeDeletedId = allBlogsAtStart[0].id
    const token = await helper.getUserToken()

    await api
      .delete(`/api/blogs/${toBeDeletedId}`)
      .set({ 'authorization': token })
      .expect(204)

    const allBlogsAtEnd = await helper.blogsInDb()
    expect(allBlogsAtEnd).toHaveLength(allBlogsAtStart.length - 1)

    const deletedBlog = allBlogsAtEnd.find(b => b.id === toBeDeletedId)
    expect(deletedBlog).toEqual(undefined)
  })

  test('bad id doesnt delete blog', async () => {
    const allBlogsAtStart = await helper.blogsInDb()
    const toBeDeletedId = allBlogsAtStart[0].id

    const token = await helper.getUserToken()
    const badId = await helper.nonexistingId()

    await api
      .delete(`/api/blogs/${badId}`)
      .set({ 'authorization': token })
      .expect(204)

    const allBlogsAtEnd = await helper.blogsInDb()
    expect(allBlogsAtEnd).toHaveLength(allBlogsAtStart.length)

    const deletedBlog = allBlogsAtEnd.find(b => b.id === toBeDeletedId)
    expect(deletedBlog).toBeDefined()
  })
})

describe('editing blogs', () => {
  test('editing likes changes its value', async () => {
    const allBlogsAtStart = await helper.blogsInDb()
    const blogToBeEdited = allBlogsAtStart[0]
    const token = await helper.getUserToken()

    const editedBlog = {
      title: blogToBeEdited.title,
      tokenor: blogToBeEdited.tokenor,
      url: blogToBeEdited.url,
      likes: blogToBeEdited.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToBeEdited.id}`)
      .set({ 'authorization': token })
      .send(editedBlog)

    const allBlogsAtEnd = await helper.blogsInDb()
    const editedBlogAtEnd = allBlogsAtEnd.find(b => b.id = blogToBeEdited.id)
    expect(editedBlogAtEnd.likes).toBe(editedBlog.likes)
  })
})


afterAll(() => {
  mongoose.connection.close()
})