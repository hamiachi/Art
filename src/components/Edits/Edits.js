"use client";

import React, { useState } from 'react'
import EditNav from './EditNav';
import BGchanger from './BGchanger/BGchanger';
import BGremover from './BGremover/BGremover';
import Blur from './Blur/Blur';
import Crop from './Crop/Crop';
import Upscaling from './Upscaling/Upscaling';
import { SessionProvider } from 'next-auth/react';
import { useSelector } from 'react-redux';
import './Edits.css'
import { useDispatch } from 'react-redux';
import { selectTool } from '@/store/toolSlice';

const Edits = () => {
  const selectedTool = useSelector((state) => state.tool.selectedTool);
  const [appear, setAppear] = useState(false);
  const dispatch = useDispatch();

  const toEnter = () => {
    setAppear(true)
  }

  const toLeave = () => {
    setAppear(false)
  }

  const handleSelectTool = (tool) => {
    dispatch(selectTool(tool));
  };

  return (
      <SessionProvider>
        <div className='Edits'>
            <EditNav className='Edits_navbar'/>
            {selectedTool !== '' &&
              <div className='Edits_content'>
                  {selectedTool === 'BGchanger' && <BGchanger />}
                  {selectedTool === 'BGremover' && <BGremover />}
                  {selectedTool === 'Blur' && <Blur />}
                  {selectedTool === 'Crop' && <Crop />}
                  {selectedTool === 'Upscaling' && <Upscaling />}
              </div>
            }
            {selectedTool === null && 
              <div className='Edits_intro'>
                <h1>Completely New Photo Editing Experience</h1>
                <p>Reinvent your images with intuitive editing tools. </p>
                <button className='Edits_intro_button'>Try edit photo</button>

                <div className='Edits_intro_feature'>
                  <b>Most popular image tools</b>
                  <div className='Edits_intro_bts'>
                    <button onMouseEnter={toEnter} onMouseLeave={toLeave} onClick={() => handleSelectTool('Blur')}>
                      <p className='Edits_intro_bts_p'>Blur image</p>
                      <img src='/edit/blur2.jpg' width={'200px'} height={'140px'} className='Edits_intro_bts_img'/>
                    </button>
                    <button onMouseEnter={toEnter} onMouseLeave={toLeave} onClick={() => handleSelectTool('Upscaling')}>
                      <p className='Edits_intro_bts_p'>Upscaling</p>
                      <img src='/edit/upscale.jpg' width={'200px'} height={'140px'} className='Edits_intro_bts_img'/>
                    </button>
                    <button onMouseEnter={toEnter} onMouseLeave={toLeave} onClick={() => handleSelectTool('Crop')}>
                      <p className='Edits_intro_bts_p'>Crop image</p>
                      <img src='/edit/crop.jpg' width={'200px'} height={'140px'} className='Edits_intro_bts_img'/>
                    </button>
                    <button onMouseEnter={toEnter} onMouseLeave={toLeave} onClick={() => handleSelectTool('BGremover')}>
                      <p className='Edits_intro_bts_p'>Background remover</p>
                      <img src='/edit/bgremove.jpg' width={'200px'} height={'140px'} className='Edits_intro_bts_img'/>
                    </button>
                    <button onMouseEnter={toEnter} onMouseLeave={toLeave} onClick={() => handleSelectTool('BGchanger')}>
                      <p className='Edits_intro_bts_p'>Background changer</p>
                      <img src='/edit/bgchange.png' width={'200px'} height={'140px'} className='Edits_intro_bts_img'/>
                    </button>
                  </div>
                  {appear && <p className='Edits_try'>TRY IT NOW !!!</p>}
                </div>
              </div>
            }
        </div>

      </SessionProvider>
  )
}

export default Edits