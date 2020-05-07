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

const ProjectMenu = ({
  projects,
  setProjects,
  user,
  setUser,
  setNotification,
}) => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/account">
        <Account setNotification={setNotification} />
      </Route>
      <Route path="/login">
        <Login setUser={setUser} setNotification={setNotification} />
      </Route>
      <Route path="/signup">
        <Signup setUser={setUser} setNotification={setNotification} />
      </Route>
      <Route exact path="/projects">
        <Projects projects={projects} />
      </Route>
      <Route exact path="/projects/create">
        <ProjectForm
          user={user}
          projects={projects}
          setProjects={setProjects}
          setNotification={setNotification}
        />
      </Route>
      <Route exact path="/project/:id">
        <Project
          user={user}
          projects={projects}
          setProjects={setProjects}
          setNotification={setNotification}
        />
      </Route>
      <Route exact path="/project/:id/edit">
        <ProjectForm
          user={user}
          projects={projects}
          setProjects={setProjects}
          setNotification={setNotification}
        />
      </Route>
      <Route exact path="/project/:projectId/:type/create">
        <CreateType setNotification={setNotification} />
      </Route>
      <Route path="/project/:projectId/:type/:typeId">
        <Type
          user={user}
          projects={projects}
          setNotification={setNotification}
        />
      </Route>
    </Switch>
  )
}

export default ProjectMenu
