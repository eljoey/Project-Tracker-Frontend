import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BackBTN from './utils/BackBTN'
import apiService from '../services/api'
import Comments from './Comments'

// TODO: form validation on comments
// TODO: error handling on comment submit
// TODO: Edit users own comments
// TODO: Project owner delete comments
// TODO: Make Pretty

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
        <h4>{projectType.name}</h4>
        <p>{projectType.description}</p>
      </div>
      <h6>Comments</h6>
      <Comments comments={comments} setComments={setComments} />
      <BackBTN />
    </>
  )
}

export default Type
