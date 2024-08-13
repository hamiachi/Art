import React, { useState } from 'react'
import './BGremover.css'
import Remover from './Remover/Remover'

const BGremover = () => {
  const [appear, setAppear] = useState(true);
  const [animate, setAnimate] = useState(false);

  const toCenter = () => {
    setAnimate(true);
  }

  return (
    <div className='BGremover'>
      <h1>Free and instant <span>background remover</span></h1>
      <p><b>Remove backgrounds</b> from photos <b>quickly</b> and 
        <b> precisely</b> with Pixart’s AI-powered background eraser.
      </p>
      <div className='BGremover_function'>
        {appear && <img src='/edit/bgremover.png' alt='' height={'300px'} width={'400px'} className={`image ${animate ? 'animate' : ''}`} />}
        <div onClick={toCenter} className={`BGremover_function_main ${animate ? 'animate' : ''}`}>
          <Remover/>
        </div>
      </div>
    </div>
  )
}

export default BGremover