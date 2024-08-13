import React from 'react'
import './Tools.css'
import { GoImage } from "react-icons/go";
import { PiSelectionBackground } from "react-icons/pi";
import { AiTwotoneFileImage } from "react-icons/ai";
import { RiMagicFill } from "react-icons/ri";
import { RiMagicLine } from "react-icons/ri";
import { LuScissorsLineDashed } from "react-icons/lu";

const Tools = () => {
  return (
    <div className='Tools'>
        <h1>Explore the Pixart toolkit</h1>
        <div className='Tools_row1'>
            <div>
                <button>
                    <GoImage className='icon' color='black'/>
                </button>
                <p>AI generate</p>
            </div>
            <div>
                <button>
                    <PiSelectionBackground className='icon' color='black'/>
                </button>
                <p>Background changer</p>
            </div>
            <div>
                <button>
                    <AiTwotoneFileImage className='icon' color='black'/>
                </button>
                <p>Blur images</p>
            </div>
        </div>
        <div className='Tools_row2'>
            <div>
                <button>
                    <RiMagicLine className='icon' color='black'/>
                </button>
                <p>Up scale</p>
            </div>
            <div>
                <button>
                    <RiMagicFill className='icon' color='black'/>
                </button>
                <p>Down scale</p>
            </div>
            <div>
                <button>
                    <LuScissorsLineDashed className='icon' color='black'/>
                </button>
                <p>Stiching</p>
            </div>
        </div>
    </div>
  )
}

export default Tools