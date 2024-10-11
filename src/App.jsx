import { useState } from 'react'

import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Route, Routes } from 'react-router-dom'
import AllContributers from './pages/AllContributers'
import AllCourses from './pages/AllCourses'
import AddCoursePage from './pages/AddCoursePage'
import StudentProfile from './pages/StudentProfile'
import FullCoursePage from './pages/FullCoursePage'
import Layout from './pages/Layout'
import About from './pages/About'
import VoteResources from './pages/VoteResources'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contributers' element={<AllContributers />} />
        <Route path='/add' element={<AddCoursePage />} />
        <Route path='/courses' element={<AllCourses />} />
        <Route path='/course/:id' element={<FullCoursePage />} />
        <Route path='/profile/:id' element={<StudentProfile />} />
        <Route  path='/about' element={<About />}/>
        <Route  path='/vote' element={<VoteResources />}/>
      </Route>

    </Routes>
  )
}

export default App
