import React from 'react'
import { useHistory } from 'react-router-dom'
import { MDBBtn } from 'mdbreact'

const BackBTN = () => {
  const history = useHistory()

  return (
    <MDBBtn color="primary" size="sm" onClick={() => history.push('/projects')}>
      back
    </MDBBtn>
  )
}

export default BackBTN
