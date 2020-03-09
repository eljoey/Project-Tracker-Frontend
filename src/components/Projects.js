import React from 'react'
import Project from './Project'
import { Link, withRouter, Switch, Route } from 'react-router-dom'

const Projects = ({ projects }) => {
  const displayProjects = () => {
    return (
      <>
        <div>
          {projects.map(proj => (
            <Link to={`/project/${proj._id}`} key={proj._id}>
              {' '}
              {proj._id}{' '}
            </Link>
          ))}
        </div>
      </>
    )
  }
  return <div>{displayProjects()}</div>
}

export default Projects
