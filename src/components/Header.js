import React, { useState } from 'react'
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from 'mdbreact'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

const Header = ({ user, setUser, setProjects }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [user])

  const toggleCollapse = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setProjects([])
    history.push('/')
  }

  const rightNavCheck = () => {
    if (loggedIn) {
      return (
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user-cog" />
              </MDBDropdownToggle>
              <MDBDropdownMenu right>
                <MDBDropdownItem divider />
                <MDBDropdownItem onClick={handleLogout}>Logout</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      )
    } else {
      return (
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink to="/login">LogIn</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/signup">SignUp</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      )
    }
  }

  const leftNavCheck = () => {
    if (loggedIn) {
      return (
        <MDBNavItem>
          <MDBNavLink to="/projects">Projects</MDBNavLink>
        </MDBNavItem>
      )
    }
  }

  // TODO: MAKE SIGNUP/CREATE ACCOUNT SHOW UP WHEN NOT LOGGED IN

  return (
    <MDBNavbar color="unique-color #3F729B" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">Project-Helper</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink to="/">Home</MDBNavLink>
          </MDBNavItem>
          {leftNavCheck()}
        </MDBNavbarNav>
        {rightNavCheck()}
      </MDBCollapse>
    </MDBNavbar>
  )
}

export default Header
