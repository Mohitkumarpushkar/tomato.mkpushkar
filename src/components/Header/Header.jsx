import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
function Header() {
  
  return (
    <div className='header'>
        <div className='header-contents'>
            <h2>Order your favourite food here</h2>
            <p>choose from a diverse menu featuring a delecatable array of dish</p>
            
             <button >View Menu</button>
        </div>
      
    </div>
  )
}

export default Header
