import React from 'react'
import Projects from './Projects'
import Project from './Project'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

const ProjectMenu = ({ projects }) => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" render={() => <Projects projects={projects} />} />
          <Route path="/project/:id" render={() => <Project />} />
        </Switch>
      </Router>
    </div>
  )
}

export default ProjectMenu
