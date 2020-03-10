import React from 'react'
import { Link } from 'react-router-dom'

const Projects = ({ projects }) => {
  const displayProjects = () => {
    return (
      <>
        <div>
          {projects.map(proj => (
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
