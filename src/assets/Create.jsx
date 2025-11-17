import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Header from './components/Header'
import { Link } from 'react-router-dom'
const Create = () => {
    const [teachers, setTeachers] = useState([])
    const [subject, setSubject] = useState("")
    const [idGuru, setidGuru] = useState("")
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/teachers")
            .then(res => {
                setTeachers(res.data.data)
                console.log(teachers)
            })
    }, [])
    const handleChange = (e) => {
        teachers.map((t) => {
            if (t.name == e.target.value) {
                console.log(t.subject)
                setSubject(t.subject)
                setidGuru(t.id)
                console.log(t.msg_counts)
            }
        })
    }
    const handleSubmit = () => {
        let teacher = document.getElementById("teachers")
        let text = document.getElementById("text")
        let mapel = document.getElementById("subject")
        let guruId = document.getElementById("guru_id")
        let data = {
            guru: teacher.value,
            guru_id: guruId.value,
            text: text.value,
            mapel: mapel.value
        }
        console.log(data)
        try {
            axios.post("http://127.0.0.1:8000/api/chat/create", data)
                .then(res => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Berhasil membuat pesan untuk ' + teacher.value,
                    })
                    console.log(res.data)
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Gagal membuat pesan untuk ' + teacher.value,
                        footer: 'Hubungi admin ' + err
                    })
                    navigator.clipboard.writeText(err.response.data.message)
                }
                )
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <>
            <Header>
                <div className="d-flex flex-col align-items-center justify-content-between">
                    <div className="">

                        <Link to={'/'} className='btn btn-primary'>Home</Link>
                        <Link to={'/admin/login'} className='btn btn-primary mx-2'>Login</Link>
                    </div>
                    <div className="">
                        Welcome to kotak Aspirasi
                    </div>
                </div>
            </Header>
            <div>
                <form className='m-4 d-flex flex-column w-75 gap-4'>
                    <select name="" id="teachers" className='form-select' onChange={(e) => handleChange(e)}>
                        <option value="Pilih" hidden>Pilih Guru</option>
                        {
                            teachers.map((t) => {
                                return (
                                    <option key={t.id} value={t.name}>{t.name}</option>
                                )
                            })
                        }
                    </select>
                    <input className='form-control' type="text" id='guru_id' value={idGuru} hidden />
                    <input className='form-control' type="text" id='subject' value={subject} hidden />
                    <input className='form-control' type="text" id='text' />
                    <button className='btn btn-primary' type="button" id='submit'
                        onClick={() => handleSubmit()}>Kirim Data </button>
                </form>
            </div>
        </>
    )
}
export default Create