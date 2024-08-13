"use client"

import React, { useEffect, useState } from 'react';
import './EditNav.css'
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { selectTool } from '@/store/toolSlice';

const EditNav = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      const newEmail = sessionStorage.getItem('token');
      setEmail(newEmail);
      if (token && newEmail) {
        try {
          const bytes = CryptoJS.AES.decrypt(newEmail, secretKey);
          const decryptedEmail = bytes.toString(CryptoJS.enc.Utf8);
          fetchUserData(decryptedEmail);
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
    };

    handleStorageChange();

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const fetchUserData = async (email) => {
    try {
      const response = await axios.post('/api/user', { email });
      setName(response.data.name);
      setToken(localStorage.getItem('token'));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleNavigate = () => {
    router.push('/login');
  };

  const handleUserClick = () => {
    setShowOptions(prevState => !prevState);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Do you want to log out?');

    if (confirmLogout) {
        signOut({ callbackUrl: '/' });
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setShowOptions(false);
        setToken(null);
    }
  };

  const handleSelectTool = (tool) => {
    dispatch(selectTool(tool));
  };

  return (
    <div className='EditNav'>
        <a href='/'><h2>Pixart</h2></a>
        <ul className='EditNav_functions'>
            <li onClick={() => handleSelectTool('BGremover')}>Background Remover</li>
            <li onClick={() => handleSelectTool('BGchanger')}>Backgorund Changer</li>
            <li onClick={() => handleSelectTool('Upscaling')}>Upscaling</li>
            <li onClick={() => handleSelectTool('Crop')}>Crop images</li>
            <li onClick={() => handleSelectTool('Blur')}>Blur images</li>
        </ul>
        <div className='EditNav_button'>
            { token ? (
                <div className='EditNav_button_user'>
                  <button className='EditNav_button_1'>Start creating</button>
                  <div className='EditNav_button_profile'>
                    <button className='EditNav_token' onClick={handleUserClick}>
                      <img src='/pics/profile.jpg' width={'35px'} height={'35px'}/>
                    </button>
                    {showOptions && (
                      <div className='EditNav_options'>
                        <p>{name}</p>
                        <button onClick={handleLogout}>Log out</button>
                      </div>
                    )}
                  </div>
                </div>
            ) : (
                <div className='Nabar_button_login'>
                  <button className='EditNav_button_1'>Start creating</button>
                  <button onClick={handleNavigate} className='EditNav_button_2'>Log in</button>
                </div>
            )}
        </div>
    </div>
  )
}

export default EditNav