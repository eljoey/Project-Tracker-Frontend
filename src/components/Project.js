import React, { useState, useEffect } from 'react'
import apiService from '../services/api'
import { useParams } from 'react-router-dom'

const Project = () => {
  const [project, setProject] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const fetchProject = async () => {
      const fetchedProject = await apiService.getProjectId(id)

      setProject(fetchedProject)
    }

    fetchProject()
  }, [id])
  console.log(project)
  const renderBugs = () => {
    if (project.bugs) {
      return project.bugs.map(bug => <p key={bug._id}>{bug.name}</p>)
    }
  }

  return (
    <>
      <div>Title: {project.name}</div>
      {renderBugs()}
    </>
  )
}

export default Project
