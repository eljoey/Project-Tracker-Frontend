import React, { useState } from 'react'
import Login from './components/Login'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  console.log('asldkfj', user)

  if (!user) {
    return <Login setUser={setUser} />
  } else {
    return <div>Logged in</div>
  }
}

export default App
