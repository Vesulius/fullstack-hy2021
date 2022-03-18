import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = ({ show, setToken }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("library-user-token", token)
    }
  }, [result.data]) // eslint-disable-line

  if (!show) return null

  const submit = async (event) => {
    event.preventDefault()
    try {
      login({ variables: { username, password } })
      setPassword("")
      setUsername("")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username:
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password:
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
