import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/authentication/Login'
import Register from '../pages/authentication/Register'

function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default AppRouter