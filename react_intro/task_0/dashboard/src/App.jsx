import { useState } from 'react'
import './App.css'
import holbertonLogo from './assets/holberton-logo.jpg'

function App() {
  return (
    <>
      <div class="App-header">
        <img src={holbertonLogo} alt="holberton logo" className="App-logo" />
        <h1>School dashboard</h1>
      </div>
      <div class="App-body">
        <p>Login to access the full dashboard</p>
      </div>
      <div class="App-footer">
        <p>Copyright 2025 - holberton School</p>
      </div>
    </>
  )
}

export default App
