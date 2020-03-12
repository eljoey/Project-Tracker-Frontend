import React from 'react'
import { useParams } from 'react-router-dom'
import BackBTN from './BackBTN'

const Type = () => {
  const { type, typeId } = useParams()

  return (
    <>
      <div>
        this is a {type} with id {typeId}
      </div>
      <BackBTN />
    </>
  )
}

export default Type
