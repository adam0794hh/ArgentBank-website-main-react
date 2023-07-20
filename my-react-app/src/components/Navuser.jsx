import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css"
import { resetUserData } from '../store/userDataSlice';


function Navuser() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetUserData());
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
            {userData.userData && ( <a className="main-nav-item">
                  <i className="fa fa-user-circle"></i>
                  {userData.userData.body.firstName}
                </a>)}
                <button onClick={handleLogout} className="button-nav-item">
                  <i className="fa fa-sign-out"></i>
                  Sign Out
                </button>
            </div>
        </nav>
    </div>
  )
}

export default Navuser