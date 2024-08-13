import React from 'react'
import { RiTextBlock } from "react-icons/ri";
import { LuImagePlus } from "react-icons/lu";
import { IoDiamondOutline } from "react-icons/io5";
import Footer from '@/components/Home/Footer';
import './HowTo.css'

const HowTo = () => {
  return (
    <div className='HowTo'>
        <div className='HowTo_head'>
            <div className='HowTo_head_infobox'>
                <div><RiTextBlock size={45}/></div>
                <h2>Create AI images with text prompts</h2>
                <p>Easily generate images with detailed text prompts in just a few seconds.</p>
            </div>
            <div className='HowTo_head_infobox'>
                <div><LuImagePlus size={45}/></div>
                <h2>Generate images in hundreds of styles</h2>
                <p>Customize your images with different styles, moods, colors, and designs inspired by famous artists.</p>
            </div>
            <div className='HowTo_head_infobox'>
                <div><IoDiamondOutline size={45}/></div>
                <h2>High-res images with incredible details</h2>
                <p>Generate high-quality images with up to 8K resolution for incredible details and texture.</p>
            </div>
        </div>
        <div className='HowTo_body'>
            <video src='/gener/AI.mp4' loop height={'700px'} width={'700px'} autoPlay muted/>
            <div className='HowTo_body_content'>
                <h1>How to generate AI images</h1>
                <div className='HowTo_body_content_detail'>
                    <h1>1</h1>
                    <div>
                        <p style={{fontWeight:'700', marginBottom:'15px', fontSize:'20px'}}>Open Picsart photo editor</p>
                        <p>Use the button below to open the AI image generator, type in your prompt, and select size and styles.</p>
                        <button>Open AI Image Generator</button>
                    </div>
                </div>
                <div className='HowTo_body_content_detail'>
                    <h1>2</h1>
                    <div>
                        <p style={{fontWeight:'700', marginBottom:'15px', fontSize:'20px'}}>Generate AI image</p>
                        <p>Click the Generate image button to begin the AI image creation process. Then choose the image that fits your vision.</p>
                    </div>
                </div>
                <div className='HowTo_body_content_detail'>
                    <h1>3</h1>
                    <div>
                        <p style={{fontWeight:'700', marginBottom:'15px', fontSize:'20px'}}>Customize image</p>
                        <p>Customize your image any way you see fit. Try out some filters or effects, add text, or adjust the colors.</p>
                    </div>
                </div>
                <div className='HowTo_body_content_detail'>
                    <h1>4</h1>
                    <div>
                        <p style={{fontWeight:'700', marginBottom:'15px', fontSize:'20px'}}>Download design</p>
                        <p>Click the Export button to download and share your designs.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HowTo