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
import { BrowserRouter as Router } from 'react-router-dom'

const Header = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  // const userInfo = user ? user.username : 'ENTER LOGIN SHIT HERE'

  const toggleCollapse = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
  }

  // TODO: FIGURE OUT HOW TO REFRESH PAGE AFTER LOGOUT
  // TODO: MAKE SIGNUP/CREATE ACCOUNT SHOW UP WHEN NOT LOGGED IN
  // TODO: MAKE UserCog NOT SHOW UP WHEN NOT LOGGED IN

  return (
    <Router>
      <MDBNavbar color="unique-color #3F729B" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Project-Helper</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="#!">Home</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user-cog" />
                </MDBDropdownToggle>
                <MDBDropdownMenu right>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem href="/" onClick={handleLogout}>
                    Logout
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
  )
}

export default Header
