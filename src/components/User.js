import React, { useState, useEffect } from 'react'
import apiService from '../services/api'
import Moment from 'react-moment'

const User = () => {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const userAPICall = async () => {
      const userInfo = await apiService.getUserInfo()

      setUserData(userInfo)
    }

    userAPICall()
  }, [])

  return (
    <>
      <h3>User Info</h3>
      <p>Username: {userData.username}</p>
      <p>
        Name: {userData.firstName} {userData.lastName}
      </p>
      <p>
        Created: <Moment format="LL">{userData.created}</Moment>
      </p>
    </>
  )
}

export default User
