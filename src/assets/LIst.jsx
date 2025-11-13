import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Viewbox from './components/Viewbox'
const LIst = () => {
    const [teacher, setTeacher] = useState([])
    const content = document.getElementById("content")
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/teachers')
            .then(data => {
                console.log(data.data)
                setTeacher(data.data.data)
            })
    }, [])
    const handleDetail = (id) => {
        // let guru
        axios.get(`http://127.0.0.1:8000/api/teacher/${id}`)
            .then(data => {
                console.log(data.data)
                const fetched = data.data.data
                // guru = fetched.name
                Swal.fire({
                    icon: 'success',
                    title: `Detail Guru ${fetched.name}`,
                    html: `<span class="text-start">Guru id : ${fetched.id_guru} <br>Nama : ${fetched.name} <br>Mapel :  ${fetched.subject} , mendapat total ${fetched.msg_counts} pesan </span>`,
                })
            })
        // axios.get(`http://127.0.0.1:8000/api/chats/${id}`)
        //     .then(data => {
        //         const fetched = data.data
        //         console.log(fetched)
        //         Swal.fire({
        //             icon: 'success',
        //             title: `Detail Guru ${guru}`,
        //             html: ''
        //         })
        //         fetched.data.forEach((a) => {
        //             console.log(a.text)
        //         })

        //     })
    }
    const showMessage = (id) => {
        axios.get(`http://127.0.0.1:8000/api/chats/${id}`)
            .then(data => {
                const fetched = data.data.data
                let msg_id = 1
                console.log(fetched)
                content.innerHTML = `
                <p>${id}</p>
                `
                content.innerHTML += `
                <div id='list${id}' class='list-group listBlyat gap-2'>
                </div>
                `
                const list = document.getElementById(`list${id}`)
                fetched.map((f) => {
                    list.innerHTML +=
                        `   
                            <div class="border border-secondary p-2 rounded-4" key=${f.id}>
                            <p class='fw-semibold'>Pesan ke ${msg_id}</p>
                            <p>${f.text}</p>
                            <p class="text-secondary createdAt">
                            created at : <br> 
                            ${f.created_at.split("T")[0]} ${f.created_at.split("T")[1].split(".")[0]} <br> 
                            Id : ${f.id}
                            </p>
                            </div>
                        `
                        msg_id+=1
                })
            })
        document.getElementById("viewMsg").style.top = '50%'
        document.getElementById("viewMsg").style.opacity = 1
    }
    const hideMessage = () => {
        document.getElementById("viewMsg").style.top = '120%'
        document.getElementById("viewMsg").style.opacity = 0
    }
    return (
        <div>
            <h1>LIst</h1>
            <table className='table table-border table-striped w-75 mx-auto my-4'>
                <thead className='text-center'>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Mapel</th>
                    <th>Jumlah Pesan</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {teacher.map((t) => {
                        return (
                            <tr>
                                <td className='text-center'>{t.id}</td>
                                <td>{t.name}</td>
                                <td>{t.subject}</td>
                                <td className='text-center'>
                                    <a className='btn btn-outline-info' onClick={() => showMessage(t.id)}>
                                        {t.msg_counts}
                                    </a>
                                </td>
                                <td className='d-flex justify-content-center'>
                                    <a className='btn btn-primary mx-auto' onClick={() => handleDetail(t.id)}>Details</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Viewbox id="viewMsg">
                <a onClick={() => hideMessage()} className='p-4'>
                    <i className='bi bi-x closeIcon'></i>
                </a>
                <div id="content"></div>
            </Viewbox>
        </div>
    )
}

export default LIst