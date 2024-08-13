import React from 'react'
import './Banner.css'

const Banner = () => {
  return (
    <div className='Banner'>
        <h1><span>Materialize</span> your creativity</h1>
        <p>
            The only AI-powered creative companion you’ll ever need to grow 
            your brand. Get it all done with Pixart’s ultimate creative suite.
        </p>
        <button>Get started for free</button>

        <div className='Banner_images'>
          <img className='Banner_images_1' src='/pics/pic2.jpeg' alt='' height={'260px'} width={'280px'}/>
          <video className='Banner_images_2' src='/pics/vid.mp4' alt='' height={'420px'} width={'310px'} autoPlay loop muted/>
          <img className='Banner_images_3' src='/pics/pic7.jpeg' alt='' height={'200px'} width={'200px'}/>
          <img className='Banner_images_4' src='/pics/pic11.jpg' alt='' height={'180px'} width={'260px'}/>
        </div>
    </div>
  )
}

export default Banner