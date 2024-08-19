"use client"

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Navbar from '../Home/Navbar';
import './Gallery.css'
import { IoSparklesSharp } from "react-icons/io5";
import { LuSparkle } from "react-icons/lu";
import { HiMiniSparkles } from "react-icons/hi2";
import { RiSparkling2Fill } from "react-icons/ri";
import { IoSparklesOutline } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi2";
import { VscSparkle } from "react-icons/vsc";
import { VscSparkleFilled } from "react-icons/vsc";

// SECRET_KEY cần phải được bảo mật, không nên để lộ trong mã nguồn front-end.
// Đây là ví dụ đơn giản chỉ để bạn hiểu cách làm.



const Gallery = () => {
  const [images, setImages] = useState([]);
  const [prompt, setPrompt] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  const divRef = useRef(null);

  useEffect(() => {
    // Kiểm tra nếu trang chưa được reload, thì reload nó
    if (!window.location.hash) {
      window.location.hash = 'reloaded';
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy token từ sessionStorage
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        // Giải mã token để lấy email
        const bytes = CryptoJS.AES.decrypt(token, secretKey);
        const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
        //const { email } = JSON.parse(decryptedToken);

        // Gọi API để lấy thông tin người dùng
        const response = await axios.post('/api/getUserPics', { email: decryptedToken });

        if (response.data && response.data.user) {
          // Lấy mảng pics từ người dùng và chuẩn bị dữ liệu để hiển thị
          const userPics = response.data.user.pics;

          const imageUrls = [];
          userPics.forEach(list => {
            const newUrl = [];
            const prompt = list[0]; // Phần tử đầu tiên là prompt
            const urls = list.slice(1); // Các phần tử còn lại là các URL ảnh
            newUrl.push(prompt);
            urls.forEach(url => {
              newUrl.push(url);
            });
            imageUrls.push(newUrl);
          });

          setImages(imageUrls);
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className='Gallery_loading'>
            <h3 style={{fontSize:'30px'}}>Loading...</h3>
            <img src='/galler/gear.gif' height={'160px'} width={'160px'}/>
          </div>;
  }

  if (error) {
    return <div className='Gallery_loading'>Error: {error}</div>;
  }

  const scrollToDiv = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' }); // Cuộn mượt đến div 5
    }
  };

  const handleDownload = (url, index) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank'; // Mở link trong tab mới
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="Gallery">
      <Navbar/>
      <div className='Gallery_banner'>
        <h1><span>Recall Your Memories</span></h1>
        <h2>Get Inspiration</h2>
        <IoSparklesSharp size={60} color='#9D1FDA' style={{position:'absolute', top:'140px', left:'300px'}} className='fade'/>
        <LuSparkle size={25} color='#7E18D0' style={{position:'absolute', top:'190px', left:'270px', transform:'rotate(180deg)'}} className='fade1'/>
        <HiMiniSparkles size={20} color='#8E1CD5' style={{position:'absolute', top:'310px', left:'1040px'}} className='fade2'/>
        <RiSparkling2Fill size={40} color='#9E1FDA' style={{position:'absolute', top:'320px', left:'1055px', transform:'rotate(90deg)'}} className='fade1'/>
        <IoSparklesOutline size={45} color='#F732F6' style={{position:'absolute', top:'200px', left:'1175px', transform:'rotate(90deg)'}} className='fade'/>
        <HiSparkles size={45} color='#7E18D0' style={{position:'absolute', top:'360px', left:'420px', transform:'rotate(180deg)'}} className='fade2'/>
        <VscSparkleFilled size={25} color='#000' style={{position:'absolute', top:'296px', left:'632px', transform:'rotate(270deg)'}} />
        <HiMiniSparkles size={25} color='#C209C1' style={{position:'absolute', top:'435px', left:'860px', transform:'rotate(270deg)'}}/>
        <div className='Gallery_banner_button'>
          <span class="dot dot-1"></span>
          <span class="dot dot-2"></span>
          <span class="dot dot-3"></span>
          <span class="dot dot-4"></span>
          <span class="dot dot-5"></span>
          <span class="dot dot-6"></span>
          <span class="dot dot-7"></span>
          <button onClick={scrollToDiv} className='buttons'>Looking back history</button>
        </div>

      </div>
      <div className='Gallery_content' ref={divRef}>
        <div className='Gallery_content_padding'></div>
        <div className='Gallery_content_head'>
          <hr className='hr_1'/>
          <h1>GALLERY</h1>
          <hr className='hr_2'/>
        </div>

        {images.length === 0 ? (
          <p style={{fontSize:'25px', marginTop:'50px'}}>No images found</p>
        ) : (
          images.map((imageGroup, index) => (
            <div key={index} className='Gallery_content_store'>
              <p><b>Prompt:</b> {imageGroup[0]}</p>
              <div className='Gallery_content_store_img'>
                {imageGroup.slice(1).map((url, urlIndex) => (  
                  <img 
                    key={urlIndex} 
                    src={url} 
                    alt={`Image ${index}_${urlIndex}`} 
                    style={{ width: '250px', height: '250px', margin:'0px 20px' }} 
                    onClick={() => handleDownload(url, `${index}_${urlIndex}`)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Gallery;
