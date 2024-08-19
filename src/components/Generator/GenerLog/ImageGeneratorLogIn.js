"use client"

import React, { useRef, useState, useEffect } from 'react'
import './ImageGeneratorLogIn.css'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js';
import Navbar from '@/components/Home/Navbar';

const ImageGeneratorLogIn = () => {

  const [style, setStyle] = useState(`photorealism`)
  const [ratio, setRatio] = useState(`1:1`)
  const [imageUrl, setImageUrl] = useState([]);
  const [imageNumber, setImageNumber] = useState(1);
  const [imageNumberLimit, setImageNumberLimit] = useState(10);
  const [shape, setShape] = useState('s11');
  const router = useRouter();
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || 'a_very_secret_key_1234567890'; // đảm bảo rằng secretKey đúng

  useEffect(() => {
    // Kiểm tra nếu trang chưa được reload, thì reload nó
    if (!window.location.hash) {
      window.location.hash = 'reloaded';
      window.location.reload();
    }
  }, []);

  const handleChange = (event) => {
    setStyle(event.target.value);
  };

  const handleChangeRatio = (event) => {
    setRatio(event.target.value);
    console.log('Selected Ratio:', event.target.value);
    const size = event.target.value + '';
    const reSize = size.replace(':', '');
    const reSizePlus = 's' + reSize;
    setShape(reSizePlus);
  };

  const handleImageNumber = (num) => {
    setImageNumber(num)
  }

  const handleImageNumberLimit = (num) => {
    setImageNumberLimit(num)
  }

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
      const urlList = [inputText, ...url];
  
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

  let inputRef = useRef(null);
  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }

    const requests = [];
    for (let i = 0; i < imageNumber; i++) {

      const options = {
        method: 'POST',
        url: 'https://api.getimg.ai/v1/essential-v2/text-to-image',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer key-1ZFqQO2I33JoOA7qLfsYrLpWXnp0WI36jMOLb4UUOC2RGqwq0G7veBhIfYkuVFCNhlXetqRLa7KPr8SghpBuIx3SnbHPREWu'
        },
        data: { style: style, prompt: `${inputRef.current.value}`, aspect_ratio: ratio, response_format: 'url' }
      };
      requests.push(axios.request(options))
      console.log(options)
    }

    try {
      const responses = await Promise.all(requests);
      const urls = responses.map(response => response.data.url);
      setImageUrl(urls)

      const newUrls = [];

      // Lặp qua từng URL trong danh sách image_create_list
      for (const [index, image_create] of urls.entries()) {
        console.log(`Bước 1: Ảnh đã được tạo thành công [${index + 1}]:`, image_create);

        try {
          // Tải ảnh về server tạm thời
          const proxyUrl = '/api/proxy'; // Địa chỉ endpoint proxy server của bạn
          const downloadResponse = await axios.post(proxyUrl, { imageUrl: image_create }, { responseType: 'arraybuffer' });
          const imageBuffer = Buffer.from(downloadResponse.data, 'binary');

          console.log(downloadResponse);
          console.log(imageBuffer);

          // Gửi ảnh đã tải lên Google Cloud Storage
          const uploadResponse = await axios.post('/api/upload', imageBuffer, {
            headers: {
              'Content-Type': 'application/octet-stream',
              'File-Name': `hamiachi/generated-image-${index + 1}.jpeg` // Đặt tên tệp theo index
            }
          });

          const newImageUrl = uploadResponse.data.url;
          console.log(`Bước 2: Ảnh đã được tải lên Google Cloud Storage [${index + 1}]:`, newImageUrl);

          // Gọi hàm handleImageUrl cho từng URL mới
          newUrls.push(newImageUrl);
        } catch (error) {
          console.error(`Error processing image [${index + 1}]:`, error);
        }
      }
      handleImageUrl(newUrls);
      //===========================================

    } catch (error){
      console.log(error)
    }
    console.log(imageUrl)
  }

  const advance = () => {
    router.push('/generator/advance')
  }

  return (
    <div className="main">
      <Navbar/>
      <div className="body flex">

        <div className="prompt">

          <div className="selection flex gap_18">
            <p>Essential</p>
            <p onClick={advance}>Advanced</p>
          </div>

          <div className="input_prompt">
            <textarea type="text" ref={inputRef} placeholder="Describle your image. Get creative..." />

            <select className="style-select" value={style} onChange={handleChange}>
              <option value="photorealism">Photorealism</option>
              <option value="artistic">Artistic</option>
              <option value="anime">Anime</option>
            </select>
          </div>


          <div className="select-ratio">

            <p>Aspect ratio</p>
            <select className="aspect-ratio" value={ratio} onChange={handleChangeRatio}>
              <option value="1:1">1:1 &nbsp; &nbsp;  1536px - 1536px </option>
              <option value="4:5">4:5 &nbsp; &nbsp; 1152px - 1440px</option>
              <option value="5:4">5:4 &nbsp; &nbsp; 1440px - 1152px</option>
              <option value="2:3">2:3 &nbsp; &nbsp; 1152px - 1728px</option>
              <option value="3:2">3:2 &nbsp; &nbsp; 1728px - 1152px</option>
              <option value="4:7">9:16 &nbsp; 1080px - 1920px</option>
              <option value="7:4">16:9 &nbsp; 1920px - 1080px</option>
            </select>

          </div>

          <div className="number-image">

            <p>Number of images</p>
            <div className="number flex">

              <div className="box" onClick={() => {handleImageNumber(1)}}>1</div>
              <div className="box" onClick={() => {handleImageNumber(2)}}>2</div>
              <div className="box" onClick={() => {handleImageNumber(4)}}>4</div>
              <div className="box" onClick={() => {handleImageNumberLimit(6)}}>6</div>
              <div className="box" onClick={() => {handleImageNumberLimit(8)}}>8</div>
              <div className="box" onClick={() => {handleImageNumberLimit(10)}}>10</div>

            </div>
          </div>

          <div className="upgrade">
            <div>Upgrade <span>to create up to <span className='upgrade_span'>{imageNumberLimit}</span> images stimultaneously</span></div>
          </div>

          <div className="generate">
            <div className="credit">{imageNumber} credits</div>

            <div className="create-button" onClick={() => { imageGenerator() }}>
              Create {imageNumber} images
            </div>

            <div className="account">

            </div>
          </div>
        </div>

        <div className="image_generate">
            {imageUrl.map((url, index) => (
              <div className={`shape ${shape}`}>
                <img className={`${shape}`} key = {index} src= {url} alt="" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ImageGeneratorLogIn