import axios from 'axios'
import React from 'react'

const Loginadmin = () => {
    const handleLogin = () => {
        console.info('sedang fetching data')
        const username = document.getElementById("username")
        const password = document.getElementById("password")
        let data = {
            "username": username.value, 
            "password": password.value
        }
        axios.post("http://127.0.0.1:8000/api/admin/login",data)
        .then(res=>{
            if(res.data.status=='success'){
                const acc = res.data.account
                acc.map((a)=>{
                    if(a.username==username.value){
                        console.log(username.value)
                        console.log(`Menemukan akun dengan nama ${a.name} ID ${a.id}`)
                        location.href = `/admin/${a.id}`
                    }
                })
            }else{
                console.log(res.data)
            }
        })
    }
    return (
        <div>
            <form action="" className='w-50 d-flex flex-column gap-2 p-2 rounded-4 my-5 mx-auto border'>
                <h3>Login Admin</h3>
                <input id='username' type="text" className="form-control" placeholder='Masukkan username'/>
                <input id='password' type="password" className="form-control" placeholder='Masukkan password'/>
                <button type='button' className='btn btn-primary' onClick={()=>handleLogin()}>Login</button>
            </form>
        </div>
    )
}

export default Loginadmin