import React from 'react'
import Project from './Project'
import { Link } from 'react-router-dom'

const Projects = ({ projects }) => {
  const displayProjects = () => {
    return (
      <div>
        {projects.map(proj => (
          <Link to={`/project/${proj._id}`}> {proj._id} </Link>
        ))}
      </div>
    )
  }
  return <div>{displayProjects()}</div>
}

export default Projects
