import React from 'react'
import { Link } from 'react-router-dom'
import { MDBBtn, MDBLink } from 'mdbreact'

const Projects = ({ projects }) => {
  const displayProjects = () => {
    return (
      <div>
        <MDBBtn tag={Link} to={'/projects/create'} color="primary" size="sm">
          Create New Project
        </MDBBtn>
        <div className="text-center">
          {projects.map((proj) => (
            <div className=" border border-dark m-1 p-2" key={proj._id}>
              <MDBLink to={`/project/${proj._id}`}>{proj.name}</MDBLink>
              <p>{proj.description}</p>
              <div className="d-flex justify-content-center">
                <MDBLink
                  to={`/project/${proj._id}`}
                  className="border border-dark rounded pill h-5 w-25 mr-5"
                >
                  Features
                  <span> ({proj.features.length})</span>
                </MDBLink>
                <MDBLink
                  to={`/project/${proj._id}`}
                  className="border border-dark rounded pill h-5 w-25"
                >
                  Bugs
                  <span> ({proj.bugs.length})</span>
                </MDBLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return <div>{displayProjects()}</div>
}

export default Projects
