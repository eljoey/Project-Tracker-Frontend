import React, { useState, useEffect } from 'react'
import apiService from '../services/api'
import { useParams, Link, useHistory } from 'react-router-dom'
import BackBTN from './utils/BackBTN'
import { MDBBtn } from 'mdbreact'
import AccessDenied from './AccessDenied'

const Project = ({ user, projects, setProjects, setMessage }) => {
  const history = useHistory()
  const { id } = useParams()
  const [project, setProject] = useState({})
  const [isMember, setIsMember] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      const fetchedProject = await apiService.getProjectId(id)
      setProject(fetchedProject)

      // Check if member of project
      if (
        fetchedProject.members.filter(
          (member) => member.username === user.username
        ).length > 0
      ) {
        setIsMember(true)
      }
    }
    fetchProject()
  }, [])

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

  const renderMembers = () => {
    let members = ''
    if (project.members !== undefined) {
      for (let i = 0; i < project.members.length; i++) {
        members += project.members[i].username + ' '
      }
    }

    return members
  }

  const handleDelete = async () => {
    if (project.admin.username !== user.username) {
      return
    }

    try {
      await apiService.deleteProject(project._id)

      // Remove deleted project from project state and update with it removed
      const updatedProjects = projects.filter(
        (proj) => proj._id !== project._id
      )

      setProjects([...updatedProjects])

      setMessage(`Deleted project '${project.name}'`)
      setTimeout(() => {
        setMessage(null)
      }, 10000)

      history.push('/projects')
    } catch (err) {
      setMessage(err.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 10000)
    }

    history.push('/projects')
  }

  // Only displayed if logged in user is admin of project.
  const renderAdminButtons = () => {
    // find a way to not need this(user doesnt show up on first render so it throws an error)
    if (!user || !project.admin) {
      return
    }

    if (user.username === project.admin.username) {
      return (
        <>
          <MDBBtn
            color="success"
            size="sm"
            tag={Link}
            to={`/project/${id}/edit`}
          >
            Edit Project
          </MDBBtn>
          <MDBBtn color="danger" size="sm" onClick={handleDelete}>
            Delete Project
          </MDBBtn>
        </>
      )
    }
  }

  if (!isMember) {
    return <AccessDenied />
  }
  return (
    <>
      <div>Title: {project.name}</div>
      <div>Description: {project.description}</div>
      <div>Admin: {getAdmin()}</div>
      <div>Members: {renderMembers()}</div>
      <h3>Features</h3>
      <Link to={`/project/${id}/feature/create`}> Create new Feature </Link>
      <div>{renderFeatures()}</div>
      <h3>Bugs</h3>
      <Link to={`/project/${id}/bug/create`}> Create new Bug </Link>
      <div>{renderBugs()}</div>
      <BackBTN />
      {renderAdminButtons()}
    </>
  )
}

export default Project
