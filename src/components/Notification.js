import React from 'react'
import { MDBAlert } from 'mdbreact'

const Notification = ({ notification }) => {
  if (notification === null) return null

  return (
    <MDBAlert color={notification.type} dismiss>
      {notification.message}
    </MDBAlert>
  )
}

export default Notification
