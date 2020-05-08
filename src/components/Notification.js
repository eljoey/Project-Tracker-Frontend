import React from 'react'
import { MDBContainer, MDBAlert } from 'mdbreact'

const Notification = ({ notification }) => {
  if (notification === null) return null

  return (
    <MDBAlert color={notification.type} dismiss>
      {' '}
      {notification.message}{' '}
    </MDBAlert>
  )
}

export default Notification
