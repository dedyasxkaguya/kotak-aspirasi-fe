import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

const Update = () => {
  let { id } = useParams();
  const [teacher, setTeacher] = useState([])
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/chat/${id}`)
      .then(res => {
        console.log(res.data)
        setTeacher(res.data.data)
        console.log(teacher)
      }
      )
  }, [id])
  const handleSubmit = () => {
    let teacherName = document.getElementById("teachers")
    let text = document.getElementById("text")
    let mapel = document.getElementById("subject")
    let data = {
      id: id,
      text: text.value,
      mapel: mapel.value
    }
    console.log(data)
    try {
      axios.post("http://127.0.0.1:8000/api/chat/update", data)
        .then(res => {
          console.log(res.data)
          if (res.status) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: `Berhasil mengedit pesan untuk ${teacherName.value}`
            })
          }
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Gagal mengedit pesan untuk ${teacherName.value}`,
            footer: 'Coba hubungi admin ' + err
          })

        })
    } catch (err) {
      console.log(err)
      return
    }
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(teacher.text)
    Swal.fire({
      icon:'success',
      title:'Berhasil',
      text:'Sukses menyalin pesan sebelumnya'
    })
  }
  return (
    <div>
      Update
      {id}
      <form className='m-4 d-flex flex-column w-75 gap-4'>
        <input type="text" name="" id="teachers" className='form-control' value={teacher.guru} disabled />
        <input className='form-control' type="text" id='guru_id' value={teacher.id} hidden />
        <input className='form-control' type="text" id='subject' value={teacher.mapel} hidden />
        <input className='form-control' type="text" id='text' placeholder={teacher.text} />
        <div className="d-flex w-100 gap-4">
          <button className='btn btn-outline-primary' type='button' onClick={()=>handleCopy()}>
            Copy pesan
            <i className='bi bi-clipboard mx-2'></i>
          </button>
          <button className='btn btn-primary' type="button" id='submit'
            onClick={() => handleSubmit()}>Kirim Data </button>
        </div>
      </form>
    </div>
  )
}

export default Update