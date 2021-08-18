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
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
          <BlogForm createMessage={createMessage}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {message !== null && <Notification message={message} />}
      <LoginForm user={user} setUser={setUser} createMessage={createMessage} />
      {user !== null && showBlogs()}
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
  return <div style={message.message.positive ? positiveMessageStyle : negativeMessageStyle}>
    {message.message.text}
  </div>
}

export default App