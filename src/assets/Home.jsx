import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Header from '../assets/components/Header'
import { Link } from 'react-router-dom'
const Home = () => {
    const [chat, setChat] = useState([])
    const [search, setSeatch] = useState("")
    useEffect(() => {
        // axios.get("http://localhost:8080/api/chats")
        axios.get("http://kotak-aspirasi.test:8080/api/chats")
            .then(data => {
                const fetched = data.data
                setChat(fetched.data)
                console.table(fetched.data)
            })
    }, [])
    // const handleDelete = (id) => {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Are you sure ?',
    //         text: 'This action cant be undo',
    //         showCancelButton: true,
    //         cancelButtonText: 'Cancel'
    //     }).then((res) => {
    //         if (res.isConfirmed) {
    //             fetch(`http://kotak-aspirasi.test:8080/api/delete/${id}`)
    //                 .then(res => res.json())
    //                 .then(data => {
    //                     const fetched = data.data
    //                     console.log(fetched)
    //                     Swal.fire({
    //                         icon: 'success',
    //                         title: "Success",
    //                         text: `Berhasil menghapus pesan untuk ` + fetched.guru
    //                     })
    //                     setTimeout(() => {
    //                         navigation.reload()
    //                     }, 2000);
    //                 })
    //         }
    //     })
    // }
    const handleDetails = (id) => {
        let fetched
        fetch(`http://kotak-aspirasi.test:8080/api/chat/${id}`)
            .then(res => res.json())
            .then(data => {
                fetched = data.data
                Swal.fire({
                    icon: 'info',
                    title: `Pesan untuk ${fetched.guru}`,
                    text: fetched.text
                })
            })
    }
    const handleSearch = (e) => {
        setSeatch(e.target.value)
        console.log(search)
    }
    return (
        <>
            <Header>
                <div className="d-flex flex-col align-items-center justify-content-between">
                    <div className="">
                        <Link to={'/create'} className='btn btn-primary'>Tambahkan Pesan</Link>
                        <Link to={'/admin/login'} className='btn btn-primary mx-2'>Login</Link>
                    </div>
                    <div className="">
                        Welcome to Kotak Aspirasi
                    </div>
                </div>
            </Header>
            <div className=''>
                List Aspirasi
                <input type="text" placeholder='Cari Nama Guru' className='form-control w-75 mx-auto rounded-2 my-2'
                    onChange={(e) => handleSearch(e)} />
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
                            chat.map((c) => {
                                if (c.guru.toLowerCase().includes(search)) {

                                    return (
                                        <tr key={c.id}>
                                            <td>{c.id}</td>
                                            <td>{c.guru}</td>
                                            <td>{c.mapel}</td>
                                            <td>{c.text}</td>
                                            <td className='d-flex justify-content-center gap-2 p-2'>
                                                <a onClick={() => handleDetails(c.id)} className='btn btn-primary'>Detail</a>
                                                {/* <button onClick={() => handleDelete(c.id)} className='btn btn-outline-danger'>Delete</button> */}
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                    {/* <Link to={'/create'}>Tambah Message</Link> */}
                </table>
            </div>
        </>
    )
}

export default Home