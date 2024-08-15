"use client"

import React, { useEffect, useState } from 'react';
import './Navbar.css'
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { signOut } from 'next-auth/react';

const Navbar = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState('');
  const [showOptions, setShowOptions] = useState(false);
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

  const goToEdits = () => {
    const tokenCurrent = sessionStorage.getItem('token');
    if (tokenCurrent === null || tokenCurrent === '') {
      const noAccount = window.confirm('You will need to log in to use this function');

      if (noAccount) {
        router.push('/login');
      }
    } else {
      router.push('/edits');
    }
  }

  const goToGallery = () => {
    const tokenCurrent = sessionStorage.getItem('token');
    if (tokenCurrent === null || tokenCurrent === '') {
      const noAccount = window.confirm('You will need to log in to use this function');

      if (noAccount) {
        router.push('/login');
      }
    } else {
      router.push('/user');
    }
  }

const goToGener = () => {
  router.push('/generator');
}

const goToSupport = () => {
  router.push('/learning');
}

const goToCommunity = () => {
  router.push('/community');
}

const goToPricing = () => {
  router.push('/price');
}

  return (
    <div className='Navbar'>
        <a href='/'><h2>Pixart</h2></a>
        <ul className='Navbar_functions'>
            <li onClick={goToEdits}>Editing tools</li>
            <li onClick={goToGener}>AI generator</li>
            <li onClick={goToGallery}>Your gallery</li>
            <li onClick={goToCommunity}>Community</li>
            <li onClick={goToSupport}>Learning & Support</li>
            <li onClick={goToPricing}>Pricing</li>
        </ul>
        <div className='Navbar_button'>
            { token ? (
                <div className='Navbar_button_user'>
                  <button className='Navbar_button_1' onClick={goToGener}>Start creating</button>
                  <div className='Navbar_button_profile'>
                    <button className='Navbar_token' onClick={handleUserClick}>
                      <img src='/pics/profile.jpg' width={'35px'} height={'35px'}/>
                    </button>
                    {showOptions && (
                      <div className='Navbar_options'>
                        <p>{name}</p>
                        <button onClick={handleLogout}>Log out</button>
                      </div>
                    )}
                  </div>
                </div>
            ) : (
                <div className='Nabar_button_login'>
                  <button className='Navbar_button_1'>Start creating</button>
                  <button onClick={handleNavigate} className='Navbar_button_2'>Log in</button>
                </div>
            )}
        </div>
    </div>
  )
}

export default Navbar