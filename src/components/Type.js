import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BackBTN from './utils/BackBTN'
import apiService from '../services/api'

const Type = () => {
  const { projectId, type, typeId } = useParams()
  const [projectType, setProjectType] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchType = async () => {
      const fetchedType = await apiService.getTypeById(projectId, type, typeId)
      const fetchedComments = await apiService.getComments(
        projectId,
        type,
        typeId
      )

      setProjectType(fetchedType)
      setComments(fetchedComments)
    }

    fetchType().catch((err) => console.log(err))
  }, [])

  return (
    <>
      <div>
        <h5>{projectType.name}</h5>
        <p>{projectType.description}</p>
      </div>
      <div>
        {comments.map((comment) => (
          <p key={comment._id}>{comment.content}</p>
        ))}
      </div>
      <BackBTN />
    </>
  )
}

export default Type
