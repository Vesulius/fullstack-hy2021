import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [change, setChange] = useState(false)

  if (change) {
    const newBlogs = blogs
      .filter(b => b.id !== null)
      .sort((blog1, blog2) => {
        return blog2.likes - blog1.likes
      })
    setBlogs(newBlogs)
    setChange(false)
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLike = async ({ blog, likes, setLikes }) => {
    try {
      await blogService.like(blog)
      blog.likes = blog.likes + 1
      setLikes(likes + 1)
      setChange(true)
    } catch(exeption) {
      console.log(exeption)
    }
  }

  const addBlog = async ({ event, title, author, url }) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }
    try {
      createMessage(true, 'New blog created')
      const response = await blogService.postBlog(blogObject)
      setBlogs(blogs.concat(response.data))
      createMessage(true, 'New blog created')
    } catch(exeption) {
      console.log(exeption)
      createMessage(false, 'Creating blog failed')
    }
  }

  const createMessage = (positive, text) => {
    const newMessage = {
      positive,
      text
    }
    setMessage(newMessage)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const showBlogs = () => {
    return (
      <>
        <Togglable showButtonLabel='create' hideButtonLabel='cancel'>
          <BlogForm addBlog={addBlog}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} setChange={setChange} handleLike={handleLike} />
        )}
      </>
    )
  }

  return (
    <div>
      { user !== null && <h2>Blogs</h2>}
      {message !== null && <Notification message={message} />}
      <LoginForm user={user} setUser={setUser} createMessage={createMessage} />
      { user !== null && showBlogs()}
    </div>
  )
}

const messageStyle = {
  color: 'blue',
  backround: 'lightgrey',
  borderStyle: 'solid',
  padding: 10,
  fontStyle: 'cursive',
  fontSize: 20,
}
const positiveMessageStyle = { ... messageStyle, color: 'green' }
const negativeMessageStyle = { ... messageStyle, color: 'red' }

const Notification = (message) => {
  return <div className="notification" style={message.message.positive ? positiveMessageStyle : negativeMessageStyle}>
    {message.message.text}
  </div>
}

export default App