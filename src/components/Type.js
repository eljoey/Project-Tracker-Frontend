import React from 'react'
import { useParams } from 'react-router-dom'

const Type = () => {
  const { type, typeId } = useParams()

  return (
    <div>
      this is a {type} with id {typeId}
    </div>
  )
}

export default Type
