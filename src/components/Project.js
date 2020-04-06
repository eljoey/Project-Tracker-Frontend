import React, { useState, useEffect } from 'react'
import apiService from '../services/api'
import { useParams, Link } from 'react-router-dom'
import BackBTN from './utils/BackBTN'

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

  const renderBugs = () => {
    if (project.bugs) {
      return project.bugs.map(bug => (
        <Link to={`/project/${id}/bug/${bug._id}`} key={bug._id}>
          {bug.name}
        </Link>
      ))
    }
  }

  const renderFeatures = () => {
    if (project.features) {
      return project.features.map(feature => (
        <Link to={`/project/${id}/feature/${feature._id}`} key={feature._id}>
          {feature.name}
        </Link>
      ))
    }
  }

  return (
    <>
      <div>Title: {project.name}</div>
      <h3>Features</h3>
      <div>{renderFeatures()}</div>
      <h3>Bugs</h3>
      <div>{renderBugs()}</div>
      <BackBTN />
    </>
  )
}

export default Project
