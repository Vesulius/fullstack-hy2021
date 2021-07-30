const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
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

  test('blog id is named id not _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('posting blogs', () => {
  test('blog added to db', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)

    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const allTitles = allBlogs.map(b => b.title)
    expect(allTitles).toContain('First class tests')
  })

  test('blog without likes values gives blog zero likes', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogWithoutLikes)
      .expect(201)

    const allBlogs = await helper.blogsInDb()
    const postedBlog = allBlogs.find(b => b.title === 'Test blog without likes')
    expect(postedBlog.likes).toBe(0)
  })

  test('blog without required content fails with code 400', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogWithoutTitleAndUrl)
      .expect(400)

    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})