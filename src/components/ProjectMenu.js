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
    <Switch>
      <Route exact path="/">
        <Projects projects={projects} />
      </Route>
      <Route path="/project/:id">
        <Project />
      </Route>
    </Switch>
  )
}

export default ProjectMenu
