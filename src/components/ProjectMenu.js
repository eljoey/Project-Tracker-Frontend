import React from 'react'
import Projects from './Projects'
import Project from './Project'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Type from './Type'
import { Route, Switch } from 'react-router-dom'

const ProjectMenu = ({ projects, setUser, setMessage }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login setUser={setUser} setMessage={setMessage} />
      </Route>
      <Route path="/signup">
        <Signup setUser={setUser} setMessage={setMessage} />
      </Route>
      <Route exact path="/projects">
        <Projects projects={projects} />
      </Route>
      <Route exact path="/project/:id">
        <Project />
      </Route>
      <Route path="/project/:id/:type/:typeId">
        <Type />
      </Route>
    </Switch>
  )
}

export default ProjectMenu
