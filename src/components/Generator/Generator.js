import React from 'react'
import Navbar from '../Home/Navbar'
import ImageGenerator from './Gener/ImageGenerator'
import HowTo from './Gener/HowTo'
import './Generator.css'

const Generator = () => {
  return (
    <div className='Generator'>
        <Navbar/>
        <div className='Generator_text'>
          <h1>Free AI Image Generator: Turn text to images online</h1>
          <p>Instantly convert words into images with Picsart’s AI image generator.
            Create images without having to draw or photograph anything.
            Just write a short prompt and convert text to images online.
            Start creating now with 3 free generations per day.
          </p>
        </div>

        <div className='Generator_content'>
          <img src='/gener/gener.jpg' alt='' width={'500px'} height={'450px'}/>
          <ImageGenerator/>
        </div>
        <HowTo/>
    </div>
  )
}

export default Generator