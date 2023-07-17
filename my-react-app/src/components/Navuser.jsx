import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css"


function Navuser() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/signin');
  };
  return (
    <div>
        <nav className='main-nav'>
            <a className='main-nav-logo'>
                <img
                className='main-nav-logo-image'
                src="/argentBankLogo.png"
                alt="Argent Bank Logo"
                />
            </a>
            <div>
            {userData.userData && ( <a class="main-nav-item">
                  <i class="fa fa-user-circle"></i>
                  {userData.userData.body.firstName}
                </a>)}
                <button onClick={handleLogout} className="button-nav-item">
                  <i class="fa fa-sign-out"></i>
                  Sign Out
                </button>
            </div>
        </nav>
    </div>
  )
}

export default Navuser