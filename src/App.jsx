// import axios from 'axios'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Swal from 'sweetalert2'
import Create from './assets/Create'
import Home from './assets/Home'
import LIst from './assets/LIst'
import AdminList from './assets/AdminList'
import Update from './assets/Update'
import Loginadmin from './assets/Loginadmin'
import Registeradmin from './assets/Registeradmin'
const App = () => {
  return (
    <Routes>
      {/* <Route path='/update/:id' element={<Update />}></Route> */}
      <Route path='/update/:id' element={<Update/> }/>
      <Route path='/admin/register' element={<Registeradmin />}></Route>
      <Route path='/admin/login' element={<Loginadmin />}></Route>
      <Route path='/admin/:id' element={<AdminList />}></Route>
      <Route path='/list' element={<LIst />}></Route>
      <Route path='/create' element={<Create />}></Route>
      <Route path='/' element={<Home />}></Route>
    </Routes>
  )
}

export default App