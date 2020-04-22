import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from 'mdbreact'
import apiService from '../services/api'

// TODO: Figure out how I'm going to handle adding members

const ProjectForm = ({ user, projects, setProjects }) => {
  const history = useHistory()
  const { id } = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const [formValues, setFormValues] = useState({
    title: '',
    name: '',
    description: '',
  })

  useEffect(() => {
    // Sets form fields for the project that wants to be edited
    if (id) {
      const editProject = projects.find((proj) => proj._id === id)

      setIsEditing(true)
      setFormValues({
        title: `Edit Project`,
        name: `${editProject.name || ''}`,
        description: `${editProject.description || ''}`,
      })
    } else {
      setFormValues({
        ...formValues,
        title: 'Create Project',
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    let currentProject
    if (isEditing) {
      const project = await apiService.getProjectId(id)

      const editedProject = {
        ...project,
        name: formValues.name,
        description: formValues.description,
      }

      currentProject = await apiService.editProject(id, editedProject)

      const updatedProjects = projects
        .filter((proj) => proj._id !== id)
        .concat(editedProject)
      setProjects(updatedProjects)
    } else {
      const newProject = {
        name: formValues.name,
        description: formValues.description,
        memberUsernames: [user.username],
      }

      currentProject = await apiService.createProject(newProject)
      setProjects([...projects, currentProject])
    }

    history.push(`/project/${currentProject._id}`)
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  return (
    <MDBContainer className=" d-flex flex-column justify-content-center align-content-center">
      <MDBRow>
        <MDBCol md="8">
          <MDBCard>
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                  {formValues.title}
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody className="mx-4 mt-4">
              <form onSubmit={handleSubmit}>
                <MDBInput
                  value={formValues.name}
                  onChange={handleChange}
                  id="name"
                  label="Name"
                  group
                  type="text"
                  validate
                  outline
                  required
                />
                <MDBInput
                  value={formValues.description}
                  onChange={handleChange}
                  id="description"
                  label="Description"
                  group
                  type="textarea"
                  validate
                  outline
                  required
                />
                {/* <MDBInput
                  value={formValues.name}
                  onChange={handleChange}
                  id="memberUsernames"
                  label="Members"
                  group
                  type="text"
                  validate
                  outline
                  required
                /> */}

                <div className="text-center mb-4 mt-5">
                  <MDBBtn
                    color="danger"
                    type="submit"
                    className="btn-block z-depth-2"
                  >
                    Submit
                  </MDBBtn>
                </div>
              </form>

              <div>
                <p className="font-small grey-text d-flex justify-content-center">
                  Change your mind?
                  <Link
                    to={`/projects`}
                    className="dark-grey-text font-weight-bold ml-1"
                  >
                    Go Back
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default ProjectForm
