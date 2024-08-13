import React from 'react'
import './Description.css'

const Description = () => {
  return (
    <div className='Description'>
        <div className='Description_content'>
            <h1>How to create AI images</h1>
            <h2>1. Enter your prompt and ratio</h2>
            <p>
                A short line or even a word will do. Then, just select the aspect 
                ratio you need—don’t worry, you can change it later if necessary!
            </p>
            <h2>2. Customize it</h2>
            <p>
                You're all set with the previous step. Now, you can select specific AI 
                styles such as Photo, Vintage, and Painting. Additionally, you can 
                use our presets for colors, framing, and lighting to refine your 
                results.
            </p>
            <h2>3. Save, download, upscale, or keep creating</h2>
            <p>
                If you like one or several images, you can save them in your profile, 
                download them, upscale them, or explore additional versions by 
                using the new Reimagine tool. Everything is just a click away.
            </p>
        </div>
        <img src='/generate.png' alt='' width={'500px'} height={'500px'}/>
    </div>
  )
}

export default Description