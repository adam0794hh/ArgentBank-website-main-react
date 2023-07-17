import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./Signin.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/UserSlice';
import { fetchUserData } from '../store/userDataSlice';


function Signin() {
    let navigate = useNavigate() 
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")


    const dispatch = useDispatch();
    const handleLogin = (e) => {
            e.preventDefault();
            let userCredentials = {
                email, password
            }
            dispatch(loginUser(userCredentials)).then((result)=>{
                if (result.payload){
                    setemail('');
                    setpassword('');
                    navigate('/user');
                }
            })
            
    }

  return (
    <div className='signin-page'>
        <Navbar/>
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleLogin}>
                    <div className="input-wrapper">
                        <label For="username">Username</label>
                        <input type="email" id="username" name="username" value={email} onChange={(e)=>setemail(e.target.value)}/>
                    </div>
                    <div className="input-wrapper">
                        <label For="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e)=>setpassword(e.target.value)}></input>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" /><label for="remember-me"
                        >Remember me</label>
                    </div>
                    <button type='submit' class="sign-in-button">Sign In</button>
                    
                </form>
            </section>
        </main>
        <Footer/>
    </div>
  )
}

export default Signin