"use client"

import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import axios from 'axios'
import { useRouter } from 'next/navigation';
const ImageGenerator = () => {

  const router = useRouter();
  
  const STATUS = {
    INITIAL: null,
    LOADING: 'loading',
    LOADED: 'loaded',
  }

  const [imageUrl, setImageUrl] = useState("/");
  const [image, setImage] = useState(STATUS.INITIAL)
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false)

  
  const imageGenerator = async() => {
    if (inputRef.current.value === ""){
      return 0;
    }

    setLoading(true)
    setImage(STATUS.LOADING)
    const options = {
      method: 'POST',
      url: 'https://api.getimg.ai/v1/stable-diffusion/text-to-image',

      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer key-1n8Yi2cd8aLgu8KBfz4W1rTRd2aiUE7sLlQGf1wlgIagYwHV0dMByvYNAzkGfwK2i6NpLUQwpQ1TZUNA1tHLBKWW78kK1Fpd'
      },

      data: {
        model: 'stable-diffusion-v1-5',
        prompt: `${inputRef.current.value}`,
        negative_prompt: 'Disfigured, cartoon, blurry',
        width: 512,
        height: 512,
        steps: 25,
        guidance: 7.5,
        seed: 0,
        scheduler: 'dpmsolver++',
        output_format: 'jpeg',
        response_format: 'url'
      }
    };

    axios
    .request(options)
    .then(function (response) {
      let image_create =response.data.url
      console.log(image_create);
      setImage(STATUS.LOADED)
      setImageUrl(image_create)
      setLoading(false)
    })
    .catch(function (error) {
      console.error(error);
    });

  }

  const advance = () => {
    router.push('/generator/login');
  }

  return (
    <div>
      <div className="ai-image-generator">
        <div className={image === STATUS.LOADING ? 'loading-class' : image === STATUS.LOADED ? 'loaded-class' : 'container'}>
          <div className="title">AI Image Generator</div>
          <div className="footer">Describe your image</div>
          <div className="input-container">
              <input type="text" ref={inputRef} placeholder="E.g. chocolate croissant on a plate in a bakery"/>
          </div>

          {image === STATUS.LOADING ? (
            <div className='center'>
              <div className='loader'></div>
            </div>
            
          ) :image === STATUS.LOADED ? (
            <div className='image_generate'><img src={imageUrl==="/"?null:imageUrl} alt="" /></div>
          ) :(
            <div/>
          )}

          <button className="button upgrade-button" onClick={() => {imageGenerator()}}>Quickly generate one image</button>
          <button className="button customize-button" onClick={advance}>
            <span>Customize and generate more images</span>
            <span ></span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageGenerator