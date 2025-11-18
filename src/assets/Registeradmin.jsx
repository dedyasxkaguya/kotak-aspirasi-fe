import axios from 'axios'
import React from 'react'

import Header from './components/Header'
import { Link } from 'react-router-dom'

const Registeradmin = () => {
    const handleLogin = () => {
        const name = document.getElementById("name")
        const username = document.getElementById("username")
        const password = document.getElementById("password")
        const data = {
            'name': name.value,
            'username': username.value,
            'password': password.value
        }
        axios.post('http://127.0.0.1:8000/api/admin/register', data)
            .then(res => console.log(res.data))
    }
    return (
        <>
            <Header>
                <div className="d-flex flex-col align-items-center justify-content-between">
                    <div className="">
                        <Link to={'/create'} className='btn btn-primary'>Tambahkan Pesan</Link>
                        <Link to={'/'} className='btn btn-primary mx-2'>Home</Link>
                    </div>
                    <div className="">
                        Welcome to kotak Aspirasi
                    </div>
                </div>
            </Header>
            <div>
                <form action="" className='w-50 d-flex flex-column gap-2 p-2 rounded-4 my-5 mx-auto border'>
                    <h3>Register Admin</h3>
                    <input id='name' type="text" className="form-control" placeholder='Masukkan nama' />
                    <input id='username' type="text" className="form-control" placeholder='Masukkan username' />
                    <input id='password' type="password" className="form-control" placeholder='Masukkan password' />
                    <button type='button' className='btn btn-primary' onClick={() => handleLogin()}>Login</button>
                </form>
            </div>
        </>
    )
}

export default Registeradmin