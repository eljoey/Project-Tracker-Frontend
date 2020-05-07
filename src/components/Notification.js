import React from 'react'
import { MDBContainer, MDBAlert } from 'mdbreact'

const Notification = ({ notification }) => {
  if (notification === null) return null

  return (
    <MDBContainer>
      <MDBAlert color={notification.type}> {notification.message} </MDBAlert>
    </MDBContainer>
  )
}

export default Notification
