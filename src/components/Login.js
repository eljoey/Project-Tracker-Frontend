import React, { useState } from 'react'
import userService from '../services/user'
import apiService from '../services/api'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await userService.login({ username, password })
      setUser({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      apiService.setToken(user.token)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          type="text"
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          name="username"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Login
