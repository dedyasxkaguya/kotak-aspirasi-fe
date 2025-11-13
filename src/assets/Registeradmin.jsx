import axios from 'axios'
import React from 'react'

const Registeradmin = () => {
    const handleLogin = () => { 
        const name = document.getElementById("name")
        const username = document.getElementById("username")
        const password = document.getElementById("password")
        const data = {
            'name' : name.value , 
            'username' : username.value ,
            'password' : password.value
        }
        axios.post('http://127.0.0.1:8000/api/admin/register',data)
        .then(res=>console.log(res.data))
    }
    return (
        <div>
            <form action="" className='w-50 d-flex flex-column gap-2 p-2 rounded-4 my-5 mx-auto border'>
                <h3>Register Admin</h3>
                <input id='name' type="text" className="form-control" placeholder='Masukkan nama' />
                <input id='username' type="text" className="form-control" placeholder='Masukkan username' />
                <input id='password' type="password" className="form-control" placeholder='Masukkan password' />
                <button type='button' className='btn btn-primary' onClick={() => handleLogin()}>Login</button>
            </form>
        </div>
    )
}

export default Registeradmin