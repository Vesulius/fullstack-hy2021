import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'


const LoginForm = ( { user, setUser, createMessage } ) => {
  const [username, setUsername] = useState('tester')
  const [password, setPassword] = useState('password1')

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
export default LoginForm