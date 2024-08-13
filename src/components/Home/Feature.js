import React from 'react'
import './Feature.css'

const Feature = () => {
  return (
    <div className='Feature'>
        <div className='Feature_AI'>
            <p>Get productive</p>
            <h1>Do more in less time</h1>
            <div className='Feature_AI_content'>
                <div>
                    <p>
                    Accelerate your creative projects and processes. AI
                    makes it faster and easier to <span>edit your photos, remove 
                    backgrounds,</span> and <span>generate new backgrounds - </span>all 
                    before your first cup of coffee.
                    </p>
                    <button>Explore AI tools</button>
                </div>
                <img src='/pics/photo.jpg' alt='' width={'790px'} height={'490px'}/>
            </div>
        </div>

        <div className='Feature_AI'>
            <p>Get inspired</p>
            <h1>Multiply your ideas</h1>
            <div className='Feature_AI_content'>
            <img src='/pics/photo1.jpg' alt='' width={'790px'} height={'490px'} style={{margin: '0px'}}/>
                <div style={{marginLeft: '35px'}}>
                    <p>
                    Go from an idea to execution in a flash. <span>Generate 
                    images</span> or discover plenty of ready-to-use <span>design 
                    templates</span> you won’t find anywhere else. Never run out 
                    of inspiration again.
                    </p>
                    <button>Generate AI images</button>
                </div>
            </div>
        </div>

        <div className='Feature_AI'>
            <p>Get connected</p>
            <h1>Engage a creative community</h1>
            <div className='Feature_AI_content'>
                <div>
                    <p style={{width: '480px'}}>
                    Join our community of 150 million+ creators just like 
                    you. Picsart unlocks fresh creative avenues,
                    empowering you to explore AI creation, share your 
                    ideas, and connect with others who share your 
                    interests in <span>Spaces.</span>
                    </p>
                </div>
                <img src='/pics/photo2.jpg' alt='' width={'790px'} height={'490px'}/>
            </div>
        </div>
    </div>
  )
}

export default Feature