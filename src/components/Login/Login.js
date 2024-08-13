"use client"

import React, { useState, useEffect } from 'react';
import Navbar from '../Home/Navbar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './Login.css'
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { signIn, useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (session) {
          toast.info('Please wait...', { autoClose: false, closeButton: false });
          const emails = session.user.email;
          const encryptedEmail = CryptoJS.AES.encrypt(emails, secretKey).toString();
          console.log(emails)
          localStorage.setItem('token', emails);
          sessionStorage.setItem('token', encryptedEmail);
          setTimeout(() => {
            toast.dismiss(); // Close the toast after redirection
          }, 4000);
          router.push('/');
      }
  }, [session, router]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      setMessage('Logging in')
      try {
        const response = await axios.post('/api/login', { email, password });
        setMessage(response.data.message);
        // Save token to localStorage
        localStorage.setItem('token', response.data.token);
    
        const encryptedEmail = CryptoJS.AES.encrypt(email, secretKey).toString();
        sessionStorage.setItem('token', encryptedEmail);
    
        // Redirect to home page
        router.push('/');
      } catch (error) {
        console.error('Login error:', error);
        // Handle errors (e.g., show an alert or message)
        setMessage('Something went wrong');
      }
    };
  
    return (
      <div className="Login">
        <Navbar/>
        <header className="Login_header">
          <h1>LOGIN</h1>
          <form onSubmit={handleSubmit} className='Login_header_form'>
            <div className='Login_header_form_detail'>
              <label>Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder='Enter your email'
              />
            </div>
            <div className='Login_header_form_detail'>
              <label>Password:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder='Enter your password'
              />
            </div>
            <p>{message}</p>
            <button type="submit" className='Login_header_form_login'>Login</button>
            <h5>Haven't got a account <a href='/register'>Register here</a></h5>

            <div className='Login_header_form_line'>
              <hr></hr>
              <p>OR</p>
              <hr></hr>
            </div>

            <button className='Login_header_form_auth' onClick={() => signIn('google')}>
                <FcGoogle size={20}/>
                <p>Continue with Google</p>
            </button>
            <button className='Login_header_form_auth' onClick={() => signIn('github')}>
                <IoLogoGithub size={20}/>
                <p>Continue with Github</p>
            </button>
          </form>
        </header>
        <ToastContainer />
      </div>
    );
}

export default Login