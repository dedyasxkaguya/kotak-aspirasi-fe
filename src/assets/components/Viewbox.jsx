import React from 'react'

const Viewbox = ({children , id} ) => {
  return (
    <div id={id} className='viewbox bg-white rounded-4 d-flex justify-content-center align-items-center p-4'>
        {children}
    </div>
  )
}

export default Viewbox