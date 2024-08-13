import React from 'react'
import './Community.css'

const Community = () => {
    const promt = {
        "1" : "An autumn forest with golden and red leaves, sunlight filtering through the trees, and a small stream flowing through.",
        "2" : "A modern city in the future with skyscrapers, flying cars, and bright neon lights.",
        "3" : "A beautiful beach with white sand, gentle waves, and a sunset creating an orange and purple sky.",
        "4" : "A portrait of a woman wearing traditional Vietnamese attire, including a conical hat, with a background of lotus flowers.",
        "15" : "An enchanted forest with giant mushrooms, glowing flowers, and mythical creatures like fairies and unicorns.",
        "18" : "A vibrant, abstract composition with swirling colors, geometric shapes, and dynamic patterns.",
        "21" : "A magical anime world with a young sorceress casting spells in a mystical forest, surrounded by glowing runes and magical creatures.",
        "22" : "A vibrant pixel art city at night, with colorful buildings, bustling streets, and neon signs glowing.",
        "24" : "A sunny day at a Japanese high school with students in uniforms, cherry blossoms in bloom, and a beautiful school courtyard.",
        "28" : "A romantic anime scene with a couple under a cherry blossom tree, petals falling around them, and a sunset in the background.",
    }

    const commonStyles = {
        border: '5px solid white',
        margin: '10px',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: 'black'
    };
      
    const stl = [
        { width: '400px', height: '400px', ...commonStyles },
        { width: '620px', height: '320px', ...commonStyles },
        { width: '250px', height: '250px', ...commonStyles },
        { width: '340px', height: '250px', ...commonStyles },
        { width: '300px', height: '598px', ...commonStyles },
        { width: '400px', height: '600px', ...commonStyles },
        { width: '460px', height: '400px', ...commonStyles },
        { width: '460px', height: '400px', ...commonStyles },
        { width: '675px', height: '350px', ...commonStyles },
        { width: '675px', height: '350px', ...commonStyles }
    ];
  return (
    <div className='Community'>
        <h1>Join <span>millions</span> of creators who grow their brand with Picsart</h1>
        <div className='Community_content'>
            <div className='Community_content_row1'>
                {/* Pic 0 */}
                <div className='Community_content_row1_1'  style={stl[0]}>
                    <img src='/commu/1.jpeg' alt='com' width={'400px'} height={'400px'}/>
                    <div className='demo' style={{marginTop: '-20px'}}>
                        <p>{promt["1"]}</p>
                        <button>Use this promt &rarr;</button>
                    </div>
                </div>
                <div>
                    {/* Pic 1 */}
                    <div className='Community_content_row1_1' style={stl[1]}>
                        <img src='/commu/24.jpeg' alt='com' width={'620px'} height={'320px'}/>
                        <div className='demo'>
                            <p>{promt["24"]}</p>
                            <button>Use this promt &rarr;</button>
                        </div>
                    </div>

                    <div style={{display: 'flex'}}>
                        {/* Pic 2 */}   
                        <div className='Community_content_row1_1' style={stl[2]}>
                            <img src='/commu/21.jpeg' alt='com' width={'250px'} height={'250px'}/>
                            <div className='demo' style={{marginTop: '-80px'}}>
                                <p>{promt["21"]}</p>
                                <button>Use this promt &rarr;</button>
                            </div>
                        </div>
                        {/* Pic 3 */}
                        <div className='Community_content_row1_1' style={stl[3]}>
                            <img src='/commu/18.jpeg' alt='com' width={'350px'} height={'250px'}/>
                            <div className='demo' style={{marginTop: '-20px'}}>
                                <p>{promt["18"]}</p>
                                <button>Use this promt &rarr;</button>
                            </div>
                        </div>

                    </div>
                </div>
                {/* Pic 4 */}
                <div className='Community_content_row1_1' style={stl[4]}>
                    <img src='/commu/4.jpeg' alt='com' width={'300px'} height={'596px'}/>
                    <div className='demo' style={{marginTop: '-40px'}}>
                        <p>{promt["4"]}</p>
                        <button>Use this promt &rarr;</button>
                    </div>
                </div>
            </div>
            <div className='Community_content_row2'>
                {/* Pic 5 */}
                <div className='Community_content_row1_1' style={stl[5]}>
                    <img src='/commu/2.jpeg' alt='com' width={'400px'} height={'600px'}/>
                    <div className='demo'>
                        <p>{promt["2"]}</p>
                        <button>Use this promt &rarr;</button>
                    </div>
                </div>
                {/* Pic 6 */}
                <div className='Community_content_row1_1' id='special' style={stl[6]}>
                    <img src='/commu/22.jpeg' alt='com' width={'460px'} height={'400px'}/>
                    <div className='demo'>
                        <p>{promt["22"]}</p>
                        <button>Use this promt &rarr;</button>
                    </div>
                </div>
                {/* Pic 7 */}
                <div className='Community_content_row1_1' id='special' style={stl[7]}>
                    <img src='/commu/15.jpeg' alt='com' width={'460px'} height={'400px'}/>
                    <div className='demo' style={{marginTop: '-20px'}}>
                        <p>{promt["15"]}</p>
                        <button>Use this promt &rarr;</button>
                    </div>
                </div>
            </div>
            <div className='Community_content_row3'>
                {/* Pic 8 */}
                <div className='Community_content_row1_1' style={stl[8]}>
                    <img src='/commu/3.jpeg' alt='com' width={'675px'} height={'350px'}/>
                    <div className='demo'>
                        <p>{promt["3"]}</p>
                        <button>Use this promt &rarr;</button>
                    </div>
                </div>
                {/* Pic 9 */}
                <div className='Community_content_row1_1' style={stl[9]}>
                    <img src='/commu/28.jpeg' alt='com' width={'675px'} height={'350px'}/>
                    <div className='demo'>
                        <p>{promt["28"]}</p>
                        <button>Use this promt &rarr;</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Community