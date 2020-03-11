import React from 'react'

const Notification = ({ message }) => {
  if (message === null) return null

  return (
    <div>
      <h1>THIS IS A NOTIFICATION: {message} </h1>
    </div>
  )
}

export default Notification
