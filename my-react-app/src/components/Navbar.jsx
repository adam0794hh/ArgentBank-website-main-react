import React from 'react'
import "./Navbar.css"

function Navbar() {
  return (
    <nav className='main-nav'>
        <a className='main-nav-logo' href=''>
            <img className='main-nav-logo-image' src='/argentBankLogo.png'></img>
        </a>
        <div>
            <a className='main-nav-item'>
                <i className="fa fa-user-circle"></i>
                Sign In  
            </a>
        </div>
    </nav>
  )
}

export default Navbar