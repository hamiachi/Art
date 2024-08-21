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

      <Grid container spacing={3.5} sx={{ height: '150px', paddingBottom: '25px' }} />

      <Grid container spacing={3.5} sx={{ backgroundColor: '#F5F5F5' }}>
        {/* Input Section */}
        <Grid item xs={12} md={6} style={{ paddingLeft: "120px" }}>
          <Card>
            <CardContent sx={{ padding: '12px' }}>
              <Grid container style={{ gap: '30px', display: 'flex', justifyContent: 'space-between', padding: '12px' }}>
                <Typography variant="h6">Input</Typography>

                <div>
                  <Button
                    aria-controls={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    variant="outlined"
                  >
                    {selectedOption} &#x25BC;
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => handleSelect('Form')}>Form</MenuItem>
                    <MenuItem onClick={() => handleSelect('JSON')}>JSON</MenuItem>
                  </Menu>
                </div>
              </Grid>

              {selectedOption === 'Form' ? (
                <Box sx={{ border: '1px solid  rgb(237, 237,237)', padding: '12px' }}>
                  <Typography variant="h7" component="div">Image URL</Typography>
                  <Grid container style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      // label="Image URL"
                      // variant="outlined"
                      value={uploadImage}
                      onChange={handleInputChange}
                      margin="normal"
                      style={{ width: '60%', marginTop: '16px' }}
                      placeholder="Add a file or provide an URL"
                    />

                    <Button
                      variant="contained"
                      component="label"
                      sx={{ height: '56px', width: '30%', marginTop: '16px' }}
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
                    fontSize: '12px',
                    paddingTop: '12px',
                    paddingBottom: '12px'
                  }}>
                    Hint: you can drag and drop file(s) here, or provide a base64 encoded data URL Accepted file types: jpg, jpeg, png, webp
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
                      alt="Square"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        backgroundColor: '#fff', // Màu trắng cho phần thừa
                      }}
                    />
                  </Box>

                  <StyledBox>
                    <Typography variant="h7" component="div">
                      Additional Settings
                    </Typography>

                    <Divider style={{ margin: '16px 0', width: '50%' }} />

                    <div>
                      <IconButton
                        aria-controls="more-menu"
                        aria-haspopup="true"
                        onClick={toggleExpanded}
                      >
                        {expanded ? 'Less' : 'More'} <ArrowDropDownIcon />
                      </IconButton>
                    </div>
                  </StyledBox>


                  {expanded ? (
                    <>
                      <Typography variant="h7" component="div" marginBottom={2}>Seed</Typography>

                      <Box display="flex" alignItems="center" gap={2} >

                        <TextField
                          inputRef={inputRef}
                          variant="outlined"
                          placeholder="random"
                          style={{ height: '35px' }}
                          InputProps={{
                            style: { height: '35px', backgroundColor: '#F3F3F3' }, // Chiều cao nội dung
                          }}
                        />
                        <IconButton onClick={generateRandomNumber} sx={{
                          border: '2px solid  rgb(196,196,196)',
                          borderRadius: '10px',
                          padding: 0,
                          height: '35px',
                          width: '35px'
                        }} >
                          <RefreshIcon />
                        </IconButton>
                      </Box>


                    </>
                  ) : (
                    <>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        Customize your input with more control.
                      </Typography>

                    </>
                  )}

                  <Box display="flex" justifyContent="flex-end" mt={2}>

                    <Button variant="outlined" color="secondary" style={{ marginRight: '8px' }}>
                      Reset
                    </Button>
                    <Button variant="contained" color="primary" onClick={customGenerate}>
                      Run
                    </Button>
                  </Box>
                </Box>
              ) : (
                // <Grid container style={{ gap: '30px', display: 'flex', justifyContent: 'space-between' }} />
                <></>
              )}


            </CardContent>
          </Card>
        </Grid>

        {/* Result Section */}
        <Grid item xs={12} md={6} style={{ paddingRight: "105px" }}>
          <Card>
            <CardContent style={{ justifyContent: 'center' }}>
              <Typography variant='h4' paddingBottom={5}>Result</Typography>

              {isLoading ? (
                <ImageResult uploadedImageUrl={uploadImage} imageUrl={newImage} imageDimensions={imageDimensions} />

              ) : (
                <LoadingBox>
                  <img src={UpIcon.src} style={{ width: '50%' }}></img>
                  <Typography variant='h5'>Waiting for your input</Typography>

                </LoadingBox>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Blur