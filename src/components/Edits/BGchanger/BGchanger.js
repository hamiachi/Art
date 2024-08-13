import React, { useState } from 'react'
import './BGchanger.css'
import Changer from './Changer/Changer'

const BGchanger = () => {
  const [appear, setAppear] = useState(true);
  const [animate, setAnimate] = useState(false);

  const toCenter = () => {
    setAnimate(true);
  }

  return (
    <div className='BGchanger'>
      <h1>Change photo <span>background online</span></h1>
      <p>Tap into the Pixart <b>background editor</b> to <b>precisely</b> change backgrounds
        of photos in seconds without having to be a pro. Utilize the built-in image
         library to <b>add backgrounds</b> with ease or upload your own. 
      </p>
      <div className='BGchanger_function'>
        {appear && <img src='/edit/bgchanger.png' alt='' height={'300px'} width={'400px'} className={`image ${animate ? 'animate' : ''}`}/>}
        <div onClick={toCenter} className={`BGchanger_function_main ${animate ? 'animate' : ''}`}>
          <Changer/>
        </div>
      </div>
    </div>
  )
}

export default BGchanger