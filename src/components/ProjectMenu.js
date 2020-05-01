import React from 'react'
import Projects from './Projects'
import Project from './Project'
import Login from './Login'
import Signup from './Signup'
import Account from './Account'
import Home from './Home'
import Type from './Type'
import CreateType from './CreateType'
import ProjectForm from './ProjectForm'
import { Route, Switch } from 'react-router-dom'

const ProjectMenu = ({ projects, setProjects, user, setUser, setMessage }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/account">
        <Account setMessage={setMessage} />
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
      <Route exact path="/projects/create">
        <ProjectForm
          user={user}
          projects={projects}
          setProjects={setProjects}
        />
      </Route>
      <Route exact path="/project/:id">
        <Project
          user={user}
          projects={projects}
          setProjects={setProjects}
          setMessage={setMessage}
        />
      </Route>
      <Route exact path="/project/:id/edit">
        <ProjectForm
          user={user}
          projects={projects}
          setProjects={setProjects}
        />
      </Route>
      <Route exact path="/project/:projectId/:type/create">
        <CreateType setMessage={setMessage} />
      </Route>
      <Route path="/project/:projectId/:type/:typeId">
        <Type user={user} projects={projects} setMessage={setMessage} />
      </Route>
    </Switch>
  )
}

export default ProjectMenu
