import React from 'react'
import './Tools.css'
import { GoImage } from "react-icons/go";
import { PiSelectionBackground } from "react-icons/pi";
import { AiTwotoneFileImage } from "react-icons/ai";
import { RiMagicFill } from "react-icons/ri";
import { RiMagicLine } from "react-icons/ri";
import { LuScissorsLineDashed } from "react-icons/lu";
import { useRouter } from 'next/navigation';

const Tools = () => {
    const router = useRouter();

    const goToGener = () => {
        router.push('/generator');
    }

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

  return (
    <div className='Tools'>
        <h1>Explore the Pixart toolkit</h1>
        <div className='Tools_row1'>
            <div>
                <button onClick={goToGener}>
                    <GoImage className='icon' color='black'/>
                </button>
                <p>AI generate</p>
            </div>
            <div>
                <button onClick={goToEdits}>
                    <PiSelectionBackground className='icon' color='black'/>
                </button>
                <p>Background changer</p>
            </div>
            <div>
                <button onClick={goToEdits}>
                    <AiTwotoneFileImage className='icon' color='black'/>
                </button>
                <p>Blur images</p>
            </div>
        </div>
        <div className='Tools_row2'>
            <div>
                <button onClick={goToEdits}>
                    <RiMagicLine className='icon' color='black'/>
                </button>
                <p>Up scale</p>
            </div>
            <div>
                <button onClick={goToEdits}>
                    <RiMagicFill className='icon' color='black'/>
                </button>
                <p>Down scale</p>
            </div>
            <div>
                <button onClick={goToEdits}>
                    <LuScissorsLineDashed className='icon' color='black'/>
                </button>
                <p>Stiching</p>
            </div>
        </div>
    </div>
  )
}

export default Tools