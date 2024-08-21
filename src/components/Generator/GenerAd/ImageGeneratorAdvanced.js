"use client"
import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setShowMoreOptions } from '@/redux/actions';
import './ImageGeneratorAdvanced.css'
import axios from 'axios'
import Model from '@/model/Model'
import { toggleShowMoreOptions } from '@/redux/optionsSlice';
import StepSlider from '@/slider/StepSlider';
import ScaleSlider from '@/slider/ScaleSlider';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SamplerMenu from '@/menu/SamplerMenu';
import { Civitai, Scheduler } from "civitai";
import ModelModal from './ModelModal';
// import Navbar from '@/components/Home/Navbar';
import LensBlurIcon from '@mui/icons-material/LensBlur';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import { Grid, Card, CardMedia, IconButton, Box, Typography } from '@mui/material';
import Navbar from '@/components/Home/Navbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SecurityUpdateIcon from '@mui/icons-material/SecurityUpdate';
import { BsFillPatchQuestionFill } from "react-icons/bs";
import CryptoJS from 'crypto-js';

const civitai = new Civitai({
    auth: "366308d6148e5d146f5dd67f8f97ba31",

});



const ImageGeneratorAdvanced = () => {

    const originalModel = {
        'urn:air:sdxl:checkpoint:civitai:133005@471120': {
            title: 'JuggernautXL',
        },
        'urn:air:sdxl:checkpoint:civitai:139562@361593': {
            title: 'RealVisXL'
        },
        'urn:air:sdxl:checkpoint:civitai:260267@403131': {
            title: "Animagine XL"
        },
        'urn:air:sd1:checkpoint:civitai:4384@128713': {
            title: 'DreamShaper'
        }
    }

    const dispatch = useDispatch();
    const showMoreOptions = useSelector((state) => state.options.showMoreOptions);
    const selectedModel = useSelector((state) => state.options.selectedModel)
    console.log(selectedModel, "Select")
    // Lấy mô hình được chọn từ Redux store
    const stepValue = useSelector((state) => state.options.stepValue)
    const scaleValue = useSelector((state) => state.options.setScale)
    const sampler = useSelector((state) => state.options.setSampler)

    const router = useRouter();

    const [model, setModel] = useState('urn:air:sdxl:checkpoint:civitai:133005@471120')
    const [label, setLablle] = useState('512 x 512px')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [randomSeed, setRandomSeed] = useState(0)
    const [ratio, setRatio] = useState([512, 512])
    const [height, setHeight] = useState(512)
    const [width, setWidth] = useState(512)
    const [imageUrl, setImageUrl] = useState([]);
    const [imageNumber, setImageNumber] = useState(1)
    const [customModel, setCustomModel] = useState(null);
    const [isUpload, setIsUpload] = useState(false)
    const [isFinal, setIsFinal] = useState(false)
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || 'a_very_secret_key_1234567890';
    

    useEffect(() => {
        // Kiểm tra nếu trang chưa được reload, thì reload nó
        if (!window.location.hash) {
            window.location.hash = 'reloaded';
            window.location.reload();
        }
    }, []);

    const handleModelChange = (event) => {
        if (event.target.value === 'more-option') {
            setIsModalOpen(true);
            // setCustomModel(true)
            if (selectedModel) {
                setModel(selectedModel.id)
                // setCustomModel(selectedModel.id)
            }

        } else {
            setModel(event.target.value);

        }
        console.log('Selected model:', event.target.value);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleChangeRatio = (event) => {
        setRatio(event.target.value);
        const ratio = event.target.value.split(',')
        console.log("AAAAAAAAAAAAAAAAA", ratio)

        setHeight(parseInt(ratio[0]))
        setWidth(parseInt(ratio[1]))
        setLablle(ratio[0] + ' x ' + ratio[1] + ' px')
    };

    const handleImageNumber = (num) => {
        setImageNumber(num)
    }

    let inputRef = useRef(null);
    let inputNegative = useRef('')
    let inputSeed = useRef(1)

    const generateRandomNumber = () => {
        const max = Math.pow(10, 10);
        const seed = inputSeed.current.value;
        console.log("seed", seed)
        let newRandomNumber = Math.floor(Math.random() * max);
        inputSeed.current.value = newRandomNumber;
        setRandomSeed(newRandomNumber);
        console.log('Random number:', inputSeed.current.value);
    };

    const suggestPromptClick = () => {
        if (inputRef.current) {
            inputRef.current.value = 'medium portrait shot of a golden retriever, wearing a hat'; // Thay đổi giá trị của input
        }
    };

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


    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
        setIsUpload(true)
        setIsFinal(false)
        // setStart(true)

        console.log('ratio')
        console.log(ratio)
        console.log(typeof(ratio))

        const input = {
            quantity: imageNumber,
            // batchSize: 2,
            model: selectedModel ? selectedModel.id : model,
            params: {
                prompt: `${inputRef.current.value}`,
                negativePrompt: `${inputNegative.current.value}`,
                scheduler: sampler,
                steps: stepValue,
                cfgScale: scaleValue,
                width: width,
                height: height,
                clipSkip: 2,
            },
        };

        console.log(input)
        try {
            const response = await civitai.image.fromText(input, true); // long polling để đợi kết quả
            const token = response.token;
            const result = await civitai.jobs.getByToken(token);
            const urls = result.jobs.map(job => job.result.blobUrl)
            console.log("Ket qua", result)
            setImageUrl(urls);

            // setStart(false)
            // Lưu URL của hình ảnh nhận được
            console.log(result.jobs[0].result.blobUrl);
            console.log("Bước 1: Ảnh đã được tạo thành công:", urls);
            console.log(imageUrl)
      
            // Tải ảnh về server tạm thời
            const proxyUrl = '/api/proxy'; // Địa chỉ endpoint proxy server của bạn
            const downloadResponse = await axios.post(proxyUrl, { imageUrl: urls }, { responseType: 'arraybuffer' });
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
            console.error(error);
        } finally {
            setIsFinal(true)

        }
        console.log('ratio')
        console.log(ratio)
    }

    const normal = () => {
        router.push('/generator/login')
    }

    console.log(imageUrl)

    const [dis, setDis] = useState(Array(7).fill(false));

    const appear = (num) => {
        const newDis = [...dis];
        newDis[num - 1] = true;
        setDis(newDis);
    };

    const disappear = (num) => {
        const newDis = [...dis];
        newDis[num - 1] = false;
        setDis(newDis);
    };

    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank'; // Mở link trong tab mới
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="main">
            <Navbar />
            <div className={showMoreOptions ? 'body blurred' : 'body'}>
                <div className="IGA" style={{position:'relative'}}>
                    <div className="IGA_prompt">
                        <div className="IGA_promt_selection">
                            <div onClick={normal}>Essential</div>
                            <div>Advanced</div>
                        </div>

                        <div className="IGA_promt_model" style={{position:'relative'}}>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', zIndex:'100'}}>
                                <p>Model</p>
                                <BsFillPatchQuestionFill style={{marginRight:'15px'}} size={16} className='question' onMouseEnter={() => appear(1)} onMouseLeave={() => disappear(1)}/>
                            </div>

                            {dis[0] && 
                                <div className='IGA_promt_model_div' style={{position:'absolute', left:'390px',zIndex:'1000' , marginTop:'-70px', height:'145px', width:'200px', borderRadius:'10px', boxShadow:'0 0 10px rgba(0,0,0,0.2)'}}>
                                    <h1>Select a model</h1>
                                    <p>Try using different AI models, to change the core aesthetic of your image.</p>
                                </div>
                            }


                            <select className='IGA_promt_model_selection' value={model} onChange={handleModelChange}>
                                <option value="urn:air:sdxl:checkpoint:civitai:133005@471120">JuggernautXL X Photorealism </option>
                                <option value="urn:air:sdxl:checkpoint:civitai:139562@361593">RealVisXL Photorealism </option>
                                <option value="urn:air:sdxl:checkpoint:civitai:260267@403131">Animagine XL Anime</option>
                                <option value="urn:air:sd1:checkpoint:civitai:4384@128713">DreamShaper Artistic</option>
                                {selectedModel && (
                                    <option value={selectedModel.id}>{selectedModel.title}</option>
                                )}
                                <option value="more-option">More - option</option>
                            </select>
                        </div>

                        <ModelModal open={isModalOpen} handleClose={handleCloseModal} />

                        <div className="IGA_promt_input">
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>Prompt</p>
                                <BsFillPatchQuestionFill style={{marginRight:'15px'}} size={16} className='question' onMouseEnter={() => appear(2)} onMouseLeave={() => disappear(2)}/>
                            </div>

                            {dis[1] && 
                                <div className='IGA_promt_model_div' style={{position:'absolute', left:'430px', boxShadow:'0 0 10px rgba(0,0,0,0.2)',zIndex:'1000' , marginTop:'-70px', height:'145px', width:'200px', borderRadius:'10px'}}>
                                    <h1>Write a Prompt</h1>
                                    <p>Describe the image you'd like to see generated. Experiment with different words and styles for the best results.</p>
                                </div>
                            }

                            <input type="text" ref={inputRef} placeholder="Describle your image. Get creative..." />
                        </div>

                        <div className="IGA_promt_negative">
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>Negative Prompt</p>
                                <BsFillPatchQuestionFill style={{marginRight:'15px'}} size={16} className='question' onMouseEnter={() => appear(3)} onMouseLeave={() => disappear(3)}/>
                            </div>
                            {dis[2] && 
                                <div className='IGA_promt_model_div' style={{position:'absolute', left:'430px', boxShadow:'0 0 10px rgba(0,0,0,0.2)',zIndex:'1000' , marginTop:'-70px', height:'145px', width:'200px', borderRadius:'10px'}}>
                                    <h1>Negative Prompt</h1>
                                    <p>Discribe details you don't want in your im your image, like color, objects or scenery</p>
                                </div>
                            }
                            <input type="text" ref={inputNegative} placeholder="Describle your image. Get creative..." />
                        </div>

                        <div className="IGA_promt_ratio">

                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>Aspect Ratio</p>
                                <BsFillPatchQuestionFill style={{marginRight:'15px'}} size={16} className='question' onMouseEnter={() => appear(4)} onMouseLeave={() => disappear(4)}/>
                            </div>
                            {dis[3] && 
                                <div className='IGA_promt_model_div' style={{position:'absolute', left:'430px', boxShadow:'0 0 10px rgba(0,0,0,0.2)',zIndex:'1000' , marginTop:'-70px', height:'145px', width:'200px', borderRadius:'10px'}}>
                                    <h1>Change Output Resolution</h1>
                                    <p>Adjust the aspect ratio to create images in various sizes and resolutions. Set High-Res, if available, to double the output resolution.</p>
                                </div>
                            }
                            <select className="aspect-ratio" value={ratio} onChange={handleChangeRatio}>

                                <option value={[512, 512]} >Square 512px x 512px</option>
                                <option value={[768, 512]} >Portrait 768px x 512px</option>
                                <option value={[512, 768]} >Landscape 512px x 768px</option>

                            </select>

                        </div>

                        <div className="IGA_promt_images">

                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>Number of images</p>
                                <BsFillPatchQuestionFill style={{marginRight:'15px'}} size={16} className='question' onMouseEnter={() => appear(5)} onMouseLeave={() => disappear(5)}/>
                            </div>
                            {dis[4] && 
                                <div className='IGA_promt_model_div' style={{position:'absolute', left:'430px', boxShadow:'0 0 10px rgba(0,0,0,0.2)',zIndex:'1000' , marginTop:'-70px', height:'145px', width:'200px', borderRadius:'10px'}}>
                                    <h1>Step</h1>
                                    <p>Increase to enhance quality. </p>
                                    <h1 style={{marginTop:'3px'}}>Scale</h1>
                                    <p>Scale controls how much the image generation process follow the prompts</p>
                                </div>
                            }
                            <div className='IGA_promt_images_detail'>
                                <div className="box" onClick={() => { handleImageNumber(1) }}>1</div>
                                <div className="box" onClick={() => { handleImageNumber(2) }}>2</div>
                                <div className="box" onClick={() => { handleImageNumber(3) }}>3</div>
                            </div>
                        </div>

                        <div className="IGA_promt_steps">
                            <StepSlider />
                        </div>

                        <div className="IGA_promt_scale">
                            <ScaleSlider />
                        </div>

                        <div className="IGA_promt_seed">
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>Seed</p>
                                <BsFillPatchQuestionFill style={{marginRight:'15px'}} size={16} className='question' onMouseEnter={() => appear(6)} onMouseLeave={() => disappear(6)}/>
                            </div>
                            {dis[5] && 
                                <div className='IGA_promt_model_div' style={{position:'absolute', left:'430px', boxShadow:'0 0 10px rgba(0,0,0,0.2)',zIndex:'1000' , marginTop:'-70px', height:'145px', width:'200px', borderRadius:'10px'}}>
                                    <h1>Seeds</h1>
                                    <p>Different numbers result in new variations of your image</p>
                                </div>
                            }
                            <div>
                                <input type="text" ref={inputSeed} placeholder="Leave blank to use a random number" />
                                <ShuffleIcon onClick={generateRandomNumber} className="IGA_promt_seed_icon" />
                            </div>
                        </div>

                        <div className="IGA_promt_sampler">
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p style={{ marginBottom: '5px' }}>Sampler</p>
                                <BsFillPatchQuestionFill size={16} className='question' onMouseEnter={() => appear(7)} onMouseLeave={() => disappear(7)}/>
                            </div>
                            {dis[6] && 
                                <div className='IGA_promt_model_div' style={{position:'absolute', left:'430px', boxShadow:'0 0 10px rgba(0,0,0,0.2)',zIndex:'1000' , marginTop:'-70px', height:'145px', width:'200px', borderRadius:'10px'}}>
                                    <h1>Sampler</h1>
                                    <p>Sampler gives you deeper control over the generation process to achieve slightly different details</p>
                                </div>
                            }
                            <SamplerMenu />
                        </div>

                        <div className="IGA_promt_generate">
                            <p> Credits</p>

                            <div className="IGA_promt_generate_button" onClick={() => { imageGenerator() }}>
                                Create {imageNumber} images
                            </div>
                        </div>
                    </div>

                    <div className="IGA_image">
                        {!isUpload ? (
                            <div className="image_preview">
                                {/* <LensBlurIcon sx={{ scale: '500%', paddingBottom: '20px' }}></LensBlurIcon> */}
                                <img src='/gener/loader.gif'/>
                                <div className="create">Created images will appear here</div>
                                <div className="looklike">Looks like you haven't created anything yet!</div>
                                <div className="looklike">Click the button below to copy a sample prompt and then click 'Create'.</div>
                                <Button sx={{
                                    backgroundColor: '#6a5acd', // Màu xanh tím
                                    color: 'white',
                                    fontWeight: 'bold',
                                    padding: '10px 20px',
                                    '&:hover': {
                                        backgroundColor: '#5a4db1', // Màu khi hover
                                    },
                                }}

                                    onClick={suggestPromptClick}
                                >
                                    Use sample prompt

                                </Button>
                            </div>
                        ) : (

                            <>
                                {isFinal ? (
                                    <>

                                        <Box sx={{ width: '100%', height: '100%', display:'flex', alignItems:'center', flexDirection:'column'}}>


                                            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{marginTop:'20px'}}>
                                                <Box display="flex">
                                                    {/* <IconButton sx={{color:'#C209C1'}}>
                                                        <FirstPageIcon/>
                                                    </IconButton> */}
                                                    <h1 style={{fontSize:'18px'}}><b>Prompt:&#160; </b></h1>
                                                    <Typography sx={{ alignSelf: 'center', paddingRight:'25px' }} >{inputRef.current.value}</Typography>

                                                </Box>

                                                <Box display='flex'>
                                                    <IconButton sx={{color:'#C209C1'}}>
                                                        <ContentCopyIcon />
                                                    </IconButton>
                                                    <Typography sx={{ alignSelf: 'center', paddingRight: '25px' }}>
                                                        {model ? originalModel[model].title : selectedModel.title}
                                                    </Typography>


                                                    <PhotoLibraryIcon sx={{ alignSelf: 'center', paddingRight: '5px', color:'#C209C1' }} />
                                                    <Typography sx={{ alignSelf: 'center', paddingRight: '25px' }}>
                                                        {imageNumber}
                                                    </Typography>


                                                    <FullscreenExitIcon sx={{ alignSelf: 'center', paddingRight: '5px', color:'#C209C1' }} />
                                                    <Typography sx={{ alignSelf: 'center', paddingRight: '25px' }}>
                                                        {label}
                                                    </Typography>

                                                    {/* <IconButton>
                                                        <SecurityUpdateIcon sx={{color:'#C209C1'}}/>
                                                    </IconButton> */}

                                                </Box>
                                            </Box>
                                            <Grid container sx={{ justifyContent: 'center' }}>
                                            {imageUrl.length === 1 && (
                                                <Grid item xs={12} sx={{alignItems:'center', display:'flex', justifyContent:'center'}}>
                                                    { (height === 512 && width === 512) && 
                                                        <Box sx={{position: 'relative', width: '50%', height: 'auto', backgroundColor: '#1E1E1E'}}>
                                                            <img src={imageUrl[0]}
                                                            style={{
                                                                position: 'absolute',
                                                                width: '100%',
                                                                border: '1px solid #C209C1',
                                                                objectFit: 'cover',
                                                                marginTop:'50px'
                                                            }}
                                                            onClick={() => handleDownload(imageUrl[0])}
                                                            className='img'
                                                            />
                                                        </Box>
                                                    }
                                                    { (height === 768 && width === 512) && 
                                                        <Box sx={{position: 'relative', width: '40%', height: 'auto', backgroundColor: '#1E1E1E'}}>
                                                            <img src={imageUrl[0]}
                                                            style={{
                                                                position: 'absolute',
                                                                width: '100%',
                                                                border: '1px solid #C209C1',
                                                                objectFit: 'cover',
                                                                marginTop:'50px'
                                                            }}
                                                            onClick={() => handleDownload(imageUrl[0])}
                                                            className='img'
                                                            />
                                                        </Box>
                                                    }
                                                    { (height === 512 && width === 768) && 
                                                        <Box sx={{position: 'relative', width: '70%', height: 'auto', backgroundColor: '#1E1E1E'}}>
                                                            <img src={imageUrl[0]}
                                                            style={{
                                                                position: 'absolute',
                                                                width: '100%',
                                                                border: '1px solid #C209C1',
                                                                objectFit: 'cover',
                                                                marginTop:'50px'
                                                            }}
                                                            onClick={() => handleDownload(imageUrl[0])}
                                                            className='img'
                                                            />
                                                        </Box>
                                                    }
                                                </Grid>
                                            )}

                                            {imageUrl.length === 2 && (
                                                imageUrl.map((image, index) => (
                                                <Grid item xs={6} key={index} sx={{alignItems:'center', display:'flex', justifyContent:'center'}}>
                                                    {(height === 512 && width === 512) && 
                                                        <Box sx={{ position: 'relative', width: '80%', height: 'auto', borderRadius: 2, backgroundColor: '#1E1E1E'}}>
                                                        <img
                                                            src={image}
                                                            style={{
                                                            position: 'absolute',
                                                            width: '100%',
                                                            borderRadius: 10,
                                                            border: '1px solid #C209C1',
                                                            objectFit: 'cover',
                                                            marginTop:'100px'
                                                            }}
                                                            onClick={() => handleDownload(image)}
                                                            className='img'
                                                        />
                                                        </Box>
                                                    }
                                                    {(height === 768 && width === 512) && 
                                                        <Box sx={{ position: 'relative', width: '70%', height: 'auto', borderRadius: 2, backgroundColor: '#1E1E1E'}}>
                                                        <img
                                                            src={image}
                                                            style={{
                                                            position: 'absolute',
                                                            width: '100%',
                                                            borderRadius: 10,
                                                            border: '1px solid #C209C1',
                                                            objectFit: 'cover',
                                                            marginTop:'50px'
                                                            }}
                                                            onClick={() => handleDownload(image)}
                                                            className='img'
                                                        />
                                                        </Box>
                                                    }
                                                    {(height === 512 && width === 768) && 
                                                        <Box sx={{ position: 'relative', width: '90%', height: 'auto', borderRadius: 2, backgroundColor: '#1E1E1E'}}>
                                                        <img
                                                            src={image}
                                                            style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            borderRadius: 10,
                                                            border: '1px solid #C209C1',
                                                            objectFit: 'cover',
                                                            marginTop:'130px'
                                                            }}
                                                            onClick={() => handleDownload(image)}
                                                            className='img'
                                                        />
                                                        </Box>
                                                    }
                                                </Grid>
                                                ))
                                            )}

                                            {imageUrl.length === 3 && (
                                                imageUrl.map((image, index) => (
                                                <Grid item xs={4} key={index} sx={{alignItems:'center', display:'flex', justifyContent:'center'}}>
                                                    {(height === 512 && width === 512) &&
                                                        <Box sx={{ position: 'relative', width: '90%', height: 'auto', borderRadius: 2, backgroundColor: '#1E1E1E'}}>
                                                        <img
                                                            src={image}
                                                            style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            borderRadius: 10,
                                                            border: '1px solid #C209C1',
                                                            objectFit: 'cover',
                                                            marginTop:'130px'
                                                            }}
                                                            onClick={() => handleDownload(image)}
                                                            className='img'
                                                        />
                                                        </Box>
                                                    }
                                                    {(height === 768 && width === 512) &&
                                                        <Box sx={{ position: 'relative', width: '90%', height: 'auto', borderRadius: 2, backgroundColor: '#1E1E1E'}}>
                                                        <img
                                                            src={image}
                                                            style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            borderRadius: 10,
                                                            border: '1px solid #C209C1',
                                                            objectFit: 'cover',
                                                            marginTop:'80px'
                                                            }}
                                                            onClick={() => handleDownload(image)}
                                                            className='img'
                                                        />
                                                        </Box>
                                                    }
                                                    {(height === 512 && width === 768) &&
                                                        <Box sx={{ position: 'relative', width: '90%', height: 'auto', borderRadius: 2, backgroundColor: '#1E1E1E'}}>
                                                        <img
                                                            src={image}
                                                            style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            borderRadius: 10,
                                                            border: '1px solid #C209C1',
                                                            objectFit: 'cover',
                                                            marginTop:'100px'
                                                            }}
                                                            onClick={() => handleDownload(image)}
                                                            className='img'
                                                        />
                                                        </Box>
                                                    }
                                                </Grid>
                                                ))
                                            )}
                                            </Grid>

                                        </Box>
                                    </>

                                ) : (
                                    <CircularProgress size={height / 2} />
                                )}
                            </>

                        )}
                    </div>
                </div>
            </div>
            <Navbar />

            {/* {showMoreOptions && (
                <div className="overlay">
                    <div className="more-option">
                        <Model />
                    </div>
                </div>
            )} */}

        </div>
    )
}

export default ImageGeneratorAdvanced