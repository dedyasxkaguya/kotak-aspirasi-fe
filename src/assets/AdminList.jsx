import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Update from './Update'
import { Link } from 'react-router-dom'

const AdminList = () => {
    const [teacher, setTeachers] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/chats')
            .then((res) => {
                setTeachers(res.data.data)
                console.log(res.data.data)
                console.log(teacher)
            })
    }, [])
    const handleDelete = (id) => {
        Swal.fire({
            icon:'question',
            title:'Are you sure',
            text:'this action cant be undone',
            showCancelButton:true
        }).then(res=>{
            if(res.isConfirmed){
                axios.get(`http://127.0.0.1:8000/api/delete/${id}`)
                .then(res=>console.log(res.data))
                setTimeout(() => {
                    navigation.reload()
                }, 1000);
            }
        })
    }
    // const handleUpdate = (id) =>{
    //     return(
    //         <Update id={id}/>
    //     )
    // }
    return (
        <div>
            AdminList
            <table className='table table-striped table-bordered w-75 mx-auto'>
                <thead className='text-center'>
                    <th>Id</th>
                    <th>Nama Guru</th>
                    <th>Mapel</th>
                    <th>Pesan</th>
                    <th colSpan={2}>Actions</th>
                </thead>
                <tbody>
                    {
                        teacher.map((c) => {
                            // if (c.guru.toLowerCase().includes(search)) {

                                return (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>{c.guru}</td>
                                        <td>{c.mapel}</td>
                                        <td>{c.text}</td>
                                        <td className='d-flex justify-content-center gap-2 p-2'>
                                            {/* <a onClick={() => handleDetails(c.id)} className='btn btn-primary'>Detail</a> */}
                                            <button onClick={() => handleDelete(c.id)} className='btn btn-outline-danger'>Delete</button>
                                            <Link to={`/update/${c.id}`} className='btn btn-outline-success'>Update</Link>
                                        </td>
                                    </tr>
                                )
                            // }
                        })
                    }
                </tbody>
                {/* <Link to={'/create'}>Tambah Message</Link> */}
            </table>
        </div>
    )
}

export default AdminList