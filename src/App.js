import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import apiService from './services/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Project from './components/Project'

function App() {
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const getProjects = async () => {
      const projectsInfo = await apiService.getProjects()
      setProjects(projectsInfo)
    }
    getProjects()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

      apiService.setToken(user.token)
    }
  }, [])

  if (!user) {
    return (
      <>
        <Header user={user} />
        <Login setUser={setUser} />
      </>
    )
  } else {
    return (
      <>
        <Header user={user} />

        <div>
          {projects.map(proj => (
            <Project key={proj._id} id={proj._id} />
          ))}
        </div>
      </>
    )
  }
}

export default App
