import React, { useState, useEffect } from 'react'
import apiService from '../services/api'

const Project = ({ id }) => {
  const [project, setProject] = useState({})

  useEffect(() => {
    const fetchProject = async () => {
      const fetchedProject = await apiService.getProjectId(id)

      setProject(fetchedProject)
    }

    fetchProject()
  }, [id])

  const renderProjects = () => {
    if (project) {
      console.log(project)

      return project.bugs.map(bug => <p>bug.name</p>)
    }
  }

  return (
    <>
      <div>Title: {project.name}</div>
      {renderProjects()}
    </>
  )
}

export default Project
