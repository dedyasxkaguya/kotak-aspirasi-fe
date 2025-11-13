// import axios from 'axios'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Swal from 'sweetalert2'
import Create from './assets/Create'
import Home from './assets/Home'
import LIst from './assets/LIst'
const App = () => {
  return (
    <Routes>
      <Route path='/list' element={<LIst />}></Route>
      <Route path='/create' element={<Create />}></Route>
      <Route path='/' element={<Home />}></Route>
    </Routes>
  )
}

export default App