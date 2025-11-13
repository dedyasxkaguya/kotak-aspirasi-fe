import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Create = () => {
    const [teachers, setTeachers] = useState([])
    const [subject, setSubject] = useState("")
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/teachers")
            .then(res => {
                setTeachers(res.data.data)
                console.log(teachers)
            })
    }, [])
    const handleChange = (e) => {
        axios.get("http://127.0.0.1:8000/api/teachers")
            .then(res => {
                setTeachers(res.data.data)
                console.log(teachers)
                teachers.map((t) => {
                    if (t.name == e.target.value) {
                        console.log(t.subject)
                        setSubject(t.subject)
                    }
                })
            })
    }
    const handleSubmit = () => {
        let teacher = document.getElementById("teachers")
        let text = document.getElementById("text")
        let mapel = document.getElementById("subject")
        let data = {
            guru: teacher.value,
            text: text.value,
            mapel: mapel.value
        }
        console.log(data)
        try {
            axios.post("http://127.0.0.1:8000/api/chat/create", data)
        } catch (err) {
            console.log(err)
        }

    }
    return (
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
                <input className='form-control' type="text" id='subject' value={subject} hidden />
                <input className='form-control' type="text" id='text' />
                <button className='btn btn-primary' type="button" id='submit'
                    onClick={() => handleSubmit()}>Kirim Data </button>
            </form>
        </div>
    )
}
export default Create