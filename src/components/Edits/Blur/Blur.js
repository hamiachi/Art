import React, { useState, useRef } from 'react';
import { Box, Grid, Typography, TextField, Button, Card, CardContent, IconButton } from '@mui/material';
import { Menu, MenuItem, Divider, Select, Switch, FormControlLabel, InputLabel, FormControl } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/system';
import ImageResult from './ImageResult';
import * as fal from "@fal-ai/serverless-client";
import UpIcon from './office.png'
import { mode } from 'crypto-js';
// import FormIcon from '@mui/icons-material/ViewModule';  // Icon tương tự như trong ảnh
import JsonIcon from '@mui/icons-material/Code';
import RefreshIcon from '@mui/icons-material/Refresh';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ImFilesEmpty } from "react-icons/im";

fal.config({
  credentials: "65b7fc8c-1ba4-4c55-b9bb-a35cfffcd110:b75ad2c0c163e9bee02f5780d1df1f8e"
});


const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',
  paddingTop: '24px'
});

const LoadingBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '550px',
  width: '100%',
  borderRadius: '10px',
  border: '1px solid black'
})

const Blur = () => {
  // let inputUrl = useRef(null)

  // useEffect(() => {
  //   if (inputUrl.current) {
  //     inpu.current.value = '';
  //   }
  // }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Form');
  const inputRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    handleClose();
  };

  const [uploadImage, setUploadImage] = useState('https://afamilycdn.com/2018/9/8/11-1536422051834582938156.jpg')
  const [imageDimensions, setImageDimensions] = useState({ width: 640, height: 800 });
  const [generateImage, setGenerateImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const [expanded, setExpanded] = useState(false);
  const [showDiv, setShowDiv] = useState(true);

  const handleChange = () => {
    setShowDiv(false);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleFileChange = async (event) => {
    setIsLoading(false)
    const selectedFile = event.target.files[0]
    const img = new Image();
    img.src = URL.createObjectURL(selectedFile);
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };

    const url = await fal.storage.upload(selectedFile);
    // inputUrl.current.value = url
    setUploadImage(url);
  };

  const handleInputChange = (e) => {
    setIsLoading(false)
    setUploadImage(e.target.value);
    const img = new Image();
    img.src = e.target.value;
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
  };

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * Math.pow(10, 8));
    if (inputRef.current) {
      inputRef.current.value = randomNumber;
    }
  };


  const customGenerate = async () => {
    console.log('adfafasfafafasfs', uploadImage)
    setNewImage(null)
    setIsLoading(true)
    // console.log("model", selectedModel)
    try {
      const result = await fal.subscribe("fal-ai/retoucher", {
        input: {
          image_url: uploadImage,
          // seed: inputRef.current.value || 0,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },

      });
      setNewImage(result.image.url);
      // setIsLoading(true)
    } catch (error) {
      // setError('Error generating image');
      setIsLoading(false)
      console.error('Error generating image:', error);
    }
    // setLoading(false);
  };
  // console.log(form)
  return (
    <Box sx={{ flexGrow: 1 }} >

      <div className='Upscale_head'>
        <h1><span>Photo enhancer:</span>  Improve image quality and resolution</h1>
        <p>Effortlessly enhance image quality in seconds with state-of-the-art AI technology. Use the Picsart photo enhancer to improve the clarity of your images and give a pop to even the tiniest details. </p>
      </div>

      <Grid container style={{  display:'flex', alignItems:'center', justifyContent:'space-evenly'}}>
        {/* Input Section */}
        {showDiv ? (
          <div className={`fade-out ${!showDiv && 'hidden'}`}>
            <img src='/edit/enhance.jpg' height={'300px'} width={'600px'} style={{marginLeft:'-200px'}}/>
          </div>
        ) : (
        <Grid style={{marginLeft:'-20px', boxShadow:'0 0 10px 2px rgba(161, 161, 161, 0.5)', borderRadius:'10px', width:'600px'}} className="fade-in">
            <CardContent>
              <Grid container style={{ display: 'flex', justifyContent: 'space-between' }} >
                <Typography variant="h6">Input</Typography>


              </Grid>

              {selectedOption === 'Form' ? (
                <Box>
                  <Grid container style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      // label="Image URL"
                      // variant="outlined"
                      value={uploadImage}
                      onChange={handleInputChange}
                      margin="normal"
                      style={{ width: '65%', marginTop: '16px' }}
                      placeholder="Add a file or provide an URL"
                    />

                    <Button
                      variant="contained"
                      component="label"
                      sx={{ height: '56px', width: '30%', marginTop: '16px', backgroundColor:'#C209C1', fontSize:'20px', '&:hover': {
                        backgroundColor: '#A107A4', // Màu nền khi hover
                    } }}
                    >
                      Choose...
                      <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </Button>
                  </Grid>

                  <Typography sx={{
                    fontSize: '13px',
                    paddingTop: '12px',
                    paddingBottom: '12px'
                  }}>
                    <b>Hint: </b> you can enter a image url here, or provide a base64 encoded data URL Accepted file types: jpg, jpeg, png, webp
                  </Typography>

                  <Box
                    sx={{
                      width: '105px',
                      height: '105px',
                      backgroundColor: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                      border: '2px solid  rgb(237, 237,237)',
                      borderRadius: '10px'
                    }}
                  >
                    <img
                      src={uploadImage}
                      alt=" &#160; View Pic"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        backgroundColor: '#fff', // Màu trắng cho phần thừa
                      }}
                    />
                  </Box>

                  <Box display="flex" justifyContent="flex-end" mt={-5}>

                    <Button variant="outlined" color="secondary" style={{ marginRight: '8px' }}>
                      Reset
                    </Button>
                    <Button variant="contained" color="primary" onClick={customGenerate}                                     
                    sx={{ backgroundColor:'#C209C1', '&:hover': {
                          backgroundColor: '#A107A4', // Màu nền khi hover
                      } }}>
                      Run
                    </Button>
                  </Box>
                </Box>
              ) : (
                // <Grid container style={{ gap: '30px', display: 'flex', justifyContent: 'space-between' }} />
                <></>
              )}


            </CardContent>
        </Grid>
        )}
        {/* Result Section */}

            <CardContent onClick={handleChange} style={{ justifyContent: 'center', display:'flex', alignItems:'center', flexDirection:'column', minWidth:'460px', minHeight:'285px', boxShadow:'0 0 10px 2px rgba(161, 161, 161, 0.5)', borderRadius:'10px'}}>
              <Typography variant='h4' paddingBottom={1} style={{fontWeight:'600', color:'#C209C1'}}>Result</Typography>

              {isLoading ? (
                <ImageResult uploadedImageUrl={uploadImage} imageUrl={newImage} imageDimensions={imageDimensions} />

              ) : (
                <LoadingBox style={{border:'3px dashed #C209C1', marginBottom:'-10px', width:'460px', height:'255px'}}>
                  <ImFilesEmpty color='#DEDEDE' size={75}/>
                  <Typography variant='h5' style={{marginTop:'15px', fontSize:'26px'}}>Waiting for your input</Typography>

                </LoadingBox>
              )}
            </CardContent>
      </Grid>
    </Box>
  );
}

export default Blur