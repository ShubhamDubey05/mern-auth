import React from 'react'
import {Routes, Route} from 'react-router'
import Home from './pages/Home'
import Emailverify from './pages/Emailverify'
import Resetpw from './pages/Resetpw'
import Login from './pages/Login'


const App = () => {
  return (
   <>
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
