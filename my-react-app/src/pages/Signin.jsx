import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./Signin.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/UserSlice';


function Signin() {
    let navigate = useNavigate() 
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")

    const {loading,error} = useSelector((state)=>state.user);

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
                        <label htmlFor="username">Username</label>
                        <input type="email" id="username" name="username" value={email} onChange={(e)=>setemail(e.target.value)}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e)=>setpassword(e.target.value)}></input>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" /><label htmlFor="remember-me"
                        >Remember me</label>
                    </div>
                    <button type='submit' className="sign-in-button">
                        {loading?'loading...':'Sign In'}
                    </button>
                    {error && (
                        <div className='alert-danger'role='alert'>{error}</div>
                    )}
                    
                </form>
            </section>
        </main>
        <Footer/>
    </div>
  )
}

export default Signin