import React from 'react'
import userService from '../services/user'
import apiService from '../services/api'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from 'mdbreact'
import { useHistory, Link } from 'react-router-dom'

const Login = ({ setUser, setNotification }) => {
  let history = useHistory()

  const handleLogin = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    try {
      const user = await userService.login({ username, password })

      setUser({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      apiService.setToken(user.token)
      history.push('/')
    } catch (err) {
      setNotification({
        message: err.response.data.error,
        type: 'danger',
      })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  return (
    <MDBContainer className=" d-flex flex-column justify-content-center align-content-center">
      <MDBRow>
        <MDBCol md="8">
          <MDBCard>
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Log in</h3>
              </MDBRow>
            </div>
            <MDBCardBody className="mx-4 mt-4">
              <form onSubmit={handleLogin}>
                <MDBInput
                  id="username"
                  label="Username"
                  group
                  type="text"
                  validate
                  outline
                  required
                />
                <MDBInput
                  id="password"
                  label="Password"
                  group
                  type="password"
                  required
                  validate
                  outline
                  containerClass="mb-0"
                />

                <div className="text-center mb-4 mt-5">
                  <MDBBtn
                    color="danger"
                    type="submit"
                    className="btn-block z-depth-2"
                  >
                    Log in
                  </MDBBtn>
                </div>
              </form>
              <div>
                <p className="font-small grey-text d-flex justify-content-center">
                  Don't have an account?
                  <Link
                    to="/signup"
                    className="dark-grey-text font-weight-bold ml-1"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Login
