import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import apiService from './services/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import ProjectMenu from './components/ProjectMenu'

function App() {
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    setLoading(false)
  }, [projects])
  console.log(projects)

  if (loading) {
    return (
      <>
        <Header user={user} />
        <div>LOADING...</div>
      </>
    )
  } else if (!user) {
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
        <ProjectMenu projects={projects} />
      </>
    )
  }
}

export default App
