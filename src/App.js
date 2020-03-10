import React, { useState, useEffect } from 'react'
import apiService from './services/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import ProjectMenu from './components/ProjectMenu'

function App() {
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getProjects = async () => {
      console.log('IM IN GET PROJECTS')
      if (user === null) {
        return
      }

      try {
        setLoading(true)
        const projectsInfo = await apiService.getProjects()
        setProjects(projectsInfo)
      } catch (err) {
        console.log(err)
      }

      setLoading(false)
    }
    getProjects()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      console.log('IM IN LOGGEDUSER')
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

      apiService.setToken(user.token)
    }
  }, [])

  if (loading) {
    return (
      <>
        <Header user={user} setUser={setUser} />
        <div>LOADING...</div>
      </>
    )
  } else {
    return (
      <>
        <Header user={user} setUser={setUser} />
        <ProjectMenu projects={projects} setUser={setUser} />
      </>
    )
  }
}

export default App
