import React from 'react'
import userService from '../services/user'
import apiService from '../services/api'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact'

const Login = ({ setUser }) => {
  const handleLogin = async e => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
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
      console.log(err.response.data.error)
    }
  }

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form onSubmit={handleLogin}>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
                id="username"
                label="Username"
                icon="envelope"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                id="password"
                label="Password"
                icon="lock"
                group
                type="password"
                validate
              />
            </div>
            <div className="text-center">
              <MDBBtn type="submit">Login</MDBBtn>
              <p>Create new account link goes here</p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Login
