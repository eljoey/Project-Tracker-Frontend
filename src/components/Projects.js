import React from 'react'
import { Link } from 'react-router-dom'
import { MDBBtn } from 'mdbreact'

const Projects = ({ projects }) => {
  const displayProjects = () => {
    return (
      <>
        <MDBBtn tag={Link} to={'/projects/create'} color="primary" size="sm">
          Create New Project
        </MDBBtn>
        <div>
          {projects.map((proj) => (
            <div key={proj._id}>
              <Link to={`/project/${proj._id}`}>{proj.name}</Link>
              <p>{proj.description}</p>
            </div>
          ))}
        </div>
      </>
    )
  }
  return <div>{displayProjects()}</div>
}

export default Projects
