import React from 'react'
import './Footer.css'
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='Footer'>
        <h1>Pixart</h1>
        <div className='Footer_content'>
            <div>
                <p>
                    Made in sunny Málaga
                </p>
                <p>
                    Copyright © 2010-2024 Freepik Company S.L.All rights reserved.
                </p>
            </div>
            <div className='Footer_content_icon'>
                <FaFacebook className='ico'/>
                <BsTwitterX className='ico'/>
                <FaPinterest className='ico'/>
                <FaInstagram className='ico'/>
                <FaYoutube className='ico'/>
                <FaLinkedin className='ico'/>
            </div>
        </div>
        <hr></hr>
    </div>
  )
}

export default Footer