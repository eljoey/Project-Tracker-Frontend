import React, { useState, useEffect } from 'react'
import apiService from '../services/api'
import { useParams, Link, useHistory } from 'react-router-dom'
import BackBTN from './utils/BackBTN'
import { MDBBtn } from 'mdbreact'

const Project = ({ user }) => {
  const history = useHistory()
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
      return project.bugs.map((bug) => (
        <Link to={`/project/${id}/bug/${bug._id}`} key={bug._id}>
          {bug.name}
        </Link>
      ))
    }
  }

  const renderFeatures = () => {
    if (project.features) {
      return project.features.map((feature) => (
        <Link to={`/project/${id}/feature/${feature._id}`} key={feature._id}>
          {feature.name}
        </Link>
      ))
    }
  }

  const getAdmin = () => {
    if (project.admin !== undefined) {
      return project.admin.username
    }
  }

  console.log('THIS IS USER', user)
  const handleDelete = async () => {
    if (project.admin.username !== user.username) {
      return
    }

    try {
      const deletedProject = await apiService.deleteProject(project._id)
      console.log(deletedProject)
    } catch (err) {
      console.log(err)
    }

    // history.push('/projects')
  }

  const renderDeleteButton = () => {
    // find a way to not need this(user doesnt show up on first render so it throws an error)
    if (!user || !project.admin) {
      return
    }

    if (user.username === project.admin.username) {
      return (
        <MDBBtn color="danger" size="sm" onClick={handleDelete}>
          Delete Project
        </MDBBtn>
      )
    }
  }

  return (
    <>
      <div>Title: {project.name}</div>
      <div>Admin: {getAdmin()}</div>
      <h3>Features</h3>
      <Link to={`/project/${id}/feature/create`}> Create new Feature </Link>
      <div>{renderFeatures()}</div>
      <h3>Bugs</h3>
      <Link to={`/project/${id}/bug/create`}> Create new Bug </Link>
      <div>{renderBugs()}</div>
      <BackBTN />
      {renderDeleteButton()}
    </>
  )
}

export default Project
