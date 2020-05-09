import React, { useState, useEffect } from 'react'
import apiService from '../services/api'
import { useParams, Link, useHistory } from 'react-router-dom'
import BackBTN from './utils/BackBTN'
import { MDBBtn, MDBLink } from 'mdbreact'
import AccessDenied from './AccessDenied'

// TODO: make members link to members page.

const Project = ({ user, projects, setProjects, setNotification }) => {
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
        <MDBLink to={`/project/${id}/bug/${bug._id}`} key={bug._id}>
          {bug.name}
        </MDBLink>
      ))
    }
  }

  const renderFeatures = () => {
    if (project.features) {
      return project.features.map((feature) => (
        <MDBLink to={`/project/${id}/feature/${feature._id}`} key={feature._id}>
          {feature.name}
        </MDBLink>
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
        members += project.members[i].username + ', '
      }
      // remove trailing comma
      members = members.slice(0, members.length - 2)
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

      setNotification({
        message: `Deleted project '${project.name}'`,
        type: 'danger',
      })
      setTimeout(() => {
        setNotification(null)
      }, 10000)

      history.push('/projects')
    } catch (err) {
      setNotification({
        message: err.response.data.error,
        type: 'danger',
      })
      setTimeout(() => {
        setNotification(null)
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
      <div className="d-flex flex-row ">
        <div className="border border-black">
          <h3>Features</h3>
          <MDBBtn
            tag={Link}
            className="btn-sm"
            color="primary"
            to={`/project/${id}/feature/create`}
          >
            Create new Feature
          </MDBBtn>
          <div className="d-flex flex-column">{renderFeatures()}</div>
        </div>
        <div className="border border-black min-vw-50">
          <h3>Bugs</h3>
          <MDBBtn
            tag={Link}
            className="btn-sm"
            color="primary"
            to={`/project/${id}/bug/create`}
          >
            Create new Bug
          </MDBBtn>
          <div className="d-flex flex-column">{renderBugs()}</div>
        </div>
      </div>

      <BackBTN />
      {renderAdminButtons()}
    </>
  )
}

export default Project
