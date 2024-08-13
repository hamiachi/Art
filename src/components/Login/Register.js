"use client"

import React, { useState, useEffect } from 'react';
import Navbar from '../Home/Navbar';
import axios from 'axios';
import './Register.css'
import CryptoJS from 'crypto-js';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        setMessage('Signing in')
    
        if (!username) newErrors.username = 'Username is required';
        if (username.length < 6 || username.length > 16) newErrors.username = 'Username must be between 6 and 16 characters';
        if (!email) newErrors.email = 'Email is required';
        if (!email.includes('@')) newErrors.email = 'Email is invalid: required @';
        if (!password) newErrors.password = 'Password is required';
        if (password !== passwordConfirm) newErrors.passwordConfirm = 'Passwords do not match';

        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post('/api/register', { username, email, password });
                setMessage(response.data.message);
                localStorage.setItem('token', response.data.token);

                const newEmail = response.data.decoded.email;
                const encryptedEmail = CryptoJS.AES.encrypt(newEmail, secretKey).toString();
                sessionStorage.setItem('token', encryptedEmail);

                window.location.href = '/';
            } catch (error) {
                console.log(error)
                setMessage('Email already in used');
            }
        }
    };

    return (
        <div className='Register'>        
            <Navbar/>
            <header className="Register_header">
                <h1>REGISTER</h1>
                <form onSubmit={handleSubmit} className='Register_header_form' noValidate>
                    <div className='Register_header_form_detail'>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            placeholder='Enter your name'
                        />
                        {errors.username && <span className='error'>* {errors.username}</span>}
                    </div>
                    <div className='Register_header_form_detail'>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            placeholder='Enter your email'
                        />
                        {errors.email && <span className='error'>* {errors.email}</span>}
                    </div>
                    <div className='Register_header_form_detail'>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder='Enter your password'
                        />
                        {errors.password && <span className='error'>* {errors.password}</span>}
                    </div>
                    <div className='Register_header_form_detail'>
                        <input 
                            type="password" 
                            value={passwordConfirm} 
                            onChange={(e) => setPasswordConfirm(e.target.value)} 
                            required 
                            placeholder='Enter again your password'
                        />
                        {errors.passwordConfirm && <span className='error'>* {errors.passwordConfirm}</span>}
                    </div>
                    <button type="submit" className='Register_header_form_login'>Register</button>
                </form>
                {  message && !errors.username && !errors.email && !errors.password && !errors.passwordConfirm  && <p className='Register_header_inform'>{message}</p>}
            </header>
        </div>
    )
}

export default Register