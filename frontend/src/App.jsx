import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Emailverify from './pages/Emailverify'
import Resetpw from './pages/Resetpw'
import Login from './pages/Login'
 import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
   <>
    <ToastContainer />
 <Routes>
  <Route path ='/' element = {<Home/>} />
  <Route path ='/login' element = {<Login/>} />
  <Route path ='/emailverify' element = {<Emailverify/>} />
  <Route path ='/resetpw' element = {<Resetpw/>} />
 </Routes>
   </>
  )
}

export default App
