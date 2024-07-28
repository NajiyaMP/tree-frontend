import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Admin/Home'
import Login from './Admin/Login';
import Dashboard from './Admin/Dashboard';

function MainRouter() {
  return (
    <div>
      <Routes>
            <Route>
              <Route path="/" element={<Login />}  />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
      </Routes>
    </div>
  )
}

export default MainRouter