import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('tester')
  const [password, setPassword] = useState('password1')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      createMessage(true, `${user.username} logged in`)
      setUsername('')
      setPassword('')
    } catch(exeption) {
      console.log(exeption)
      createMessage(false, 'password or username is incorrect')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    createMessage(true, `${user.username} logged out`)
    setUsername('')
    setPassword('')
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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }
    try {
      blogService.postBlog(blogObject)
      createMessage(true, 'New blog created')
    } catch(exeption) {
      console.log(exeption)
      createMessage(false, 'Creating blog failed')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {message !== null && <Notification message={message} />}
        <form onSubmit={e => handleLogin(e)}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      {message !== null && <Notification message={message} />}
      <p>{user.username} logged on
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
            url:
          <input
            type="text"
            value={url}
            name="title"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} title={blog.title} author={blog.author} />
      )}
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