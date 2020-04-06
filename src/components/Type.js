import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BackBTN from './utils/BackBTN'
import apiService from '../services/api'

const Type = () => {
  const { projectId, type, typeId } = useParams()
  const [projectType, setProjectType] = useState([])

  useEffect(() => {
    const fetchType = async () => {
      const fetchedType = await apiService.getTypeById(projectId, type, typeId)

      setProjectType(fetchedType)
    }

    fetchType()
  }, [projectId, type, typeId])

  return (
    <>
      <div>
        <h5>{projectType.name}</h5>
        <p>{projectType.description}</p>
      </div>
      <BackBTN />
    </>
  )
}

export default Type
