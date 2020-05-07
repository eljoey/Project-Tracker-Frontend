import React, { useState } from 'react'
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
import userService from '../services/user'
import apiService from '../services/api'

// TODO: FORM VALIDATION
// TODO: USERNAME ALREADY TAKEN HANDLING (BACKEND NEEDS TO SEND MESSAGE)

const Signup = ({ setNotification, setUser }) => {
  const history = useHistory()
  const [formValues, setFormValues] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: '',
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formValues.password !== formValues.passwordConfirm) {
      setNotification({
        message: 'Passwords must match',
        type: 'danger',
      })
      setTimeout(() => {
        setNotification(null)
      }, 10000)
      return
    }

    const user = {
      username: formValues.username,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      password: formValues.password,
    }

    try {
      const newUser = await userService.register(user)
      console.log(newUser)
      setUser({
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      apiService.setToken(user.token)
      history.push('/')
    } catch (err) {
      let errorMessage = ''

      // handles error message when username has been taken
      err.response.data.error.includes(
        'Error, expected `username` to be unique'
      )
        ? (errorMessage = 'Username already in use, Please try another')
        : (errorMessage = err.response.data.error)

      setNotification({
        message: errorMessage,
        type: 'danger',
      })
      setTimeout(() => {
        setNotification(null)
      }, 10000)
    }
  }

  return (
    <MDBContainer className=" d-flex flex-column justify-content-center align-content-center">
      <MDBRow>
        <MDBCol md="8">
          <MDBCard>
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Sign up</h3>
              </MDBRow>
            </div>
            <MDBCardBody className="mx-4 mt-4">
              <form onSubmit={handleSubmit}>
                <MDBInput
                  value={formValues.username}
                  onChange={handleChange}
                  id="username"
                  label="Username"
                  group
                  type="text"
                  validate
                  outline
                  required
                />
                <MDBInput
                  value={formValues.firstName}
                  onChange={handleChange}
                  id="firstName"
                  label="First Name"
                  group
                  type="text"
                  validate
                  outline
                  required
                />
                <MDBInput
                  value={formValues.lastName}
                  onChange={handleChange}
                  id="lastName"
                  label="Last Name"
                  group
                  type="text"
                  validate
                  outline
                  required
                />
                <MDBInput
                  value={formValues.password}
                  onChange={handleChange}
                  id="password"
                  label="Password"
                  group
                  type="password"
                  validate
                  containerClass="mb-0"
                  outline
                  required
                />
                <MDBInput
                  value={formValues.passwordConfirm}
                  onChange={handleChange}
                  id="passwordConfirm"
                  label="Confirm Password"
                  group
                  type="password"
                  validate
                  containerClass="mb-0"
                  outline
                  required
                />

                <div className="text-center mb-4 mt-5">
                  <MDBBtn
                    color="danger"
                    type="submit"
                    className="btn-block z-depth-2"
                  >
                    Sign up
                  </MDBBtn>
                </div>
              </form>
              <div>
                <p className="font-small grey-text d-flex justify-content-center">
                  Already have an account?
                  <Link
                    to="/login"
                    className="dark-grey-text font-weight-bold ml-1"
                  >
                    Log In
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

export default Signup
