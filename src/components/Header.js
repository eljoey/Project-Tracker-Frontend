import React from 'react'

const Header = ({ user }) => {
  const userInfo = user ? user.username : 'ENTER LOGIN SHIT HERE'

  return (
    <div>
      <div>Home</div>
      <div>{userInfo}</div>
    </div>
  )
}

export default Header
