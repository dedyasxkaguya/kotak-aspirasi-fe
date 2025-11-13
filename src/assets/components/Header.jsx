import React from 'react'

const Header = ({ children }) => {
    return (
        <nav className='w-100 bg-primary p-3 text-white'>
            {children}
        </nav>
    )
}

export default Header