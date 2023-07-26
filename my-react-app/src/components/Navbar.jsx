import React from 'react'
import "./Navbar.css"
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className='main-nav'>
        <NavLink to= "/" className='main-nav-logo'>
            <img className='main-nav-logo-image' src='/argentBankLogo.png' alt='Argent Bank Logo'></img>
        </NavLink>
        <div>
          <NavLink to= "/signin"className='main-nav-item'>
              <i className="fa fa-user-circle"></i>
              Sign In  
          </NavLink>
        </div>
    </nav>
  )
}

export default Navbar