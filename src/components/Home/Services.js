'use client';

import React, { useState, useEffect } from 'react';
import './Services.css'

const Services = () => {
  const [number, setNumber] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber(prevNumber => (prevNumber < 7 ? prevNumber + 1 : 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const activeElement = document.getElementById('active');
    if (activeElement) {
      activeElement.removeAttribute('id');
    }

    const newActiveElement = document.querySelector(`.class-${number}`);
    if (newActiveElement) {
      newActiveElement.setAttribute('id', 'active');
    }
  }, [number]);

  const handleMouseEnter = (value) => {
    setNumber(value);
  };

  return (
    <div className='Services'>
        <h1>Design for <span>every purpose</span></h1>
        <p>
            Start with a customizable template or from a blank canvas. However you begin, the end is
            a design that’s all yours.
        </p>
        <div className='Services_design'>
            <ul>
                <li onMouseEnter={() => handleMouseEnter(1)} className='class-1'>Fashion & Beauty</li>
                <li onMouseEnter={() => handleMouseEnter(2)} className='class-2'>Real Estate</li>
                <li onMouseEnter={() => handleMouseEnter(3)} className='class-3'>Food & Drink</li>
                <li onMouseEnter={() => handleMouseEnter(4)} className='class-4'>Interior Design</li>
                <li onMouseEnter={() => handleMouseEnter(5)} className='class-5'>Health & Wellness</li>
                <li onMouseEnter={() => handleMouseEnter(6)} className='class-6'>Education</li>
                <li onMouseEnter={() => handleMouseEnter(7)} className='class-7'>Entertainment</li>
            </ul>
            <div className='Services_design_pic'>
              {number === 1 && 
                <div className='Services_design_pic_fashion'>
                  <div className='Services_design_pic_fashion_1'>
                    <img src='/design/fashion1.jpg' alt='fashion' width={'230px'} height={'230px'}/>
                    <img src='/design/fashion2.jpg' alt='fashion' width={'230px'} height={'230px'}/>
                  </div>
                  <div className='Services_design_pic_fashion_1'>
                    <img src='/design/fashion3.jpg' alt='fashion' width={'230px'} height={'230px'}/>
                    <img src='/design/fashion4.jpg' alt='fashion' width={'230px'} height={'230px'}/>
                  </div>
                </div>
              }
              {number === 2 && 
                <div className='Services_design_pic_estate'>
                  <img src='/design/estate1.jpg' alt='estate' width={'250px'} height={'400px'}/>
                  <img src='/design/estate2.jpg' alt='estate' width={'250px'} height={'400px'}/>
                  <img src='/design/estate3.jpg' alt='estate' width={'250px'} height={'400px'}/>
                </div>
              }
              {number === 3 &&
                <div className='Services_design_pic_food'>
                  <img src='/design/food1.jpg' alt='food' width={'550px'} height={'418px'}/>
                  <div>
                    <img src='/design/food2.jpg' alt='food' width={'200px'} height={'200px'}/>
                    <img src='/design/food3.jpg' alt='food' width={'200px'} height={'200px'}/>
                  </div>
                </div>
              }
              {number === 4 &&
                <div className='Services_design_pic_interior'>
                  <img src='/design/interior1.jpg' alt='interior' width={'550px'} height={'350px'}/>
                  <div>
                    <img src='/design/interior2.jpg' alt='interior' width={'550px'} height={'350px'}/>
                  </div>
                </div>
              }
              {number === 5 &&
                <div className='Services_design_pic_health'>
                  <img src='/design/health2.jpeg' alt='health' width={'250px'} height={'415px'}/>
                  <div>
                    <img src='/design/health.jpeg' alt='health' width={'200px'} height={'200px'}/>
                    <img src='/design/health1.jpeg' alt='health' width={'200px'} height={'200px'}/>
                  </div>
                  <img src='/design/health3.jpeg' alt='health' width={'250px'} height={'415px'}/>

                </div>
              }
              {number === 6 && 
                <div className='Services_design_pic_education'>
                  <img src='/design/education.jpg' alt='education' width={'550px'} height={'400px'}/>
                  <img src='/design/education1.jpg' alt='education' width={'250px'} height={'350px'} style={{marginTop:'50px'}}/>
                </div>
              }
              {number === 7 &&
                <div className='Services_design_pic_enter'>
                  <div>
                    <img src='/design/enter1.jpg' alt='enter' width={'400px'} height={'250px'}/>
                    <img src='/design/enter2.jpg' alt='enter' width={'400px'} height={'250px'}/>
                  </div>
                  <img src='/design/enter.jpg' alt='enter' width={'350px'} height={'200px'}/>
                </div>
              }
            </div>
        </div>
        <button>Get started for free</button>
    </div>
  )
}

export default Services