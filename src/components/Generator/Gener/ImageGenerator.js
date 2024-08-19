"use client"

import React, { useRef, useState, useEffect } from 'react'
import './ImageGenerator.css'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation';
import CryptoJS from 'crypto-js';
const ImageGenerator = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  // const secretKey = process.env.GETIMG_KEY;
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || 'a_very_secret_key_1234567890'; // đảm bảo rằng secretKey đúng
  
  const STATUS = {
    INITIAL: null,
    LOADING: 'loading',
    LOADED: 'loaded',
  }

  const [imageUrl, setImageUrl] = useState("/");
  const [image, setImage] = useState(STATUS.INITIAL)
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Lấy giá trị của text từ query parameter
    const text = searchParams.get('text');
    
    // Nếu có giá trị text, gán nó vào input
    if (text && inputRef.current) {
        inputRef.current.value = decodeURIComponent(text);
    }
  }, [searchParams]);

  const handleImageUrl = async (url) => {
    console.log("Bước 3: Đang cập nhật URL vào MongoDB...");
    const token = sessionStorage.getItem('token');
  
    if (!token) {
      console.log("No token found, skipping handleImageUrl");
      return;
    }
  
    try {
      // Giải mã token để lấy email
      console.log("Original Token:", token);
      const bytes = CryptoJS.AES.decrypt(token, secretKey);
      const decryptedEmail = bytes.toString(CryptoJS.enc.Utf8);
      console.log("Decrypted Email:", decryptedEmail);
  
      if (!decryptedEmail) {
        console.log("Failed to decrypt email or email is empty");
        return;
      }
  
      // Lấy giá trị input
      const inputText = inputRef.current.value;
      const urlList = [inputText, url];
  
      // Gửi yêu cầu đến máy chủ MongoDB để cập nhật thông tin người dùng
      const response = await axios.post('/api/updateUser', {
        email: decryptedEmail,
        pic: urlList, // Gửi dưới dạng {input: url}
      });
  
      if (response.status === 200) {
        console.log("User's pics array updated successfully with input and URL");
      } else {
        console.log("Failed to update user's pics array");
      }
    } catch (error) {
      console.error("Error in handleImageUrl:", error);
    }
  };

  const imageGenerator = async() => {
    if (inputRef.current.value === ""){
      return 0;
    }

    setLoading(true);
    setImage(STATUS.LOADING);
    console.log("Bước 1: Đang tạo ảnh...");
    const options = {
      method: 'POST',
      url: 'https://api.getimg.ai/v1/stable-diffusion/text-to-image',

      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer key-3k1nmjvo0f5bI7rRicJ1qYcewPA7xGRQ1tR4iawVGfLlfXj511rIMMpFtb8q7wLQMRPYIAulnzqcqwhPwalLh5uTTSf18S8e'
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

    try {
      const response = await axios.request(options);
      const image_create = response.data.url;
      setImage(STATUS.LOADED)
      setImageUrl(image_create)
      console.log("Bước 1: Ảnh đã được tạo thành công:", image_create);
      console.log(imageUrl)

      // Tải ảnh về server tạm thời
      const proxyUrl = '/api/proxy'; // Địa chỉ endpoint proxy server của bạn
      const downloadResponse = await axios.post(proxyUrl, { imageUrl: image_create }, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(downloadResponse.data, 'binary');

      console.log(downloadResponse)
      console.log(imageBuffer)

      // Gửi ảnh đã tải lên Google Cloud Storage
      const uploadResponse = await axios.post('/api/upload', imageBuffer, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'File-Name': 'hamiachi/generated-image1.jpeg' // Tên của tệp trên Google Cloud Storage
        }
      });

      const newImageUrl = uploadResponse.data.url;
      console.log("Bước 2: Ảnh đã được tải lên Google Cloud Storage:", newImageUrl); // **URL ảnh được đưa lên GG Storage**
      handleImageUrl(newImageUrl);

    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
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