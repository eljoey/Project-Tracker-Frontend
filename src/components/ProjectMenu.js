import React from 'react'
import Projects from './Projects'
import Project from './Project'
import Login from './Login'
import Home from './Home'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

const ProjectMenu = ({ projects, setUser }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/projects">
        <Projects projects={projects} />
      </Route>
      <Route path="/project/:id">
        <Project />
      </Route>
      <Route path="/login">
        <Login setUser={setUser} />
      </Route>
    </Switch>
  )
}

export default ProjectMenu
