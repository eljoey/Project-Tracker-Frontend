import React, { useState, useEffect } from 'react'
import apiService from './services/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import ProjectMenu from './components/ProjectMenu'
import Notification from './components/Notification'

// TODO: RESTRICT LOGIN AND SIGNUP PAGES WHEN LOGGED IN

function App() {
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const getProjects = async () => {
      // if statement prevents calling api on initial page load
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
        <Header user={user} setUser={setUser} setProjects={setProjects} />
        <Notification message={message} />
        <ProjectMenu
          projects={projects}
          setUser={setUser}
          setMessage={setMessage}
        />
      </>
    )
  }
}

export default App
