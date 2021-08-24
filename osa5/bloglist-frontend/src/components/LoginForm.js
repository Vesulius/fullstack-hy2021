import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'


const LoginForm = ( { user, setUser, createMessage } ) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    createMessage(true, `${user.username} logged out`)
    setUsername('')
    setPassword('')
  }

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
  if (user !== null) {
    return (
      <div>{user.username} logged on
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <form id="login-form" onSubmit={event => handleLogin(event)}>
        <div>
            username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id="password"
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
export default LoginForm