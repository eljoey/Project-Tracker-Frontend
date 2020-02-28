import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import apiService from './services/api'
import './App.css'
import Header from './components/Header'

function App() {
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const getProjects = async () => {
      const projectsInfo = await apiService.getProjects()
      setProjects(projectsInfo)
      console.log(projectsInfo)
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
  }

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
        <a href="http://localhost:3000" onClick={handleLogout}>
          Logout
        </a>
        <div>
          {projects.map(proj => (
            <div>{proj.name}</div>
          ))}
        </div>
      </>
    )
  }
}

export default App
