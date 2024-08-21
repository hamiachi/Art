import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Card, CardContent, IconButton } from '@mui/material';
import { Menu, MenuItem, Divider, Select, Switch, FormControlLabel, InputLabel, FormControl } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/system';
import ImageResult from './ImageResult';
import Aura from './Aura';
import CCSR from './CCSR';
import * as fal from "@fal-ai/serverless-client";
import Clarity from './Clarity';
import UpIcon from './office.png'
import { mode } from 'crypto-js';
import './Upscaling.css'
import { ImFilesEmpty } from "react-icons/im";

fal.config({
    credentials: "65b7fc8c-1ba4-4c55-b9bb-a35cfffcd110:b75ad2c0c163e9bee02f5780d1df1f8e"
});

const StyledBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
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
function Upscaling() {
    const [imageFile, setImageFile] = useState(null);
    const [uploadImage, setUploadImage] = useState(null)
    const [model, setModel] = useState(null)
    const [selectedModel, setSelectedModel] = useState('Model Selection');
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [generateImage, setGenerateImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [showDiv, setShowDiv] = useState(true);

    const handleChange = () => {
      setShowDiv(false);
    };

    const handleModelClick = (event) => {
        if (event) {
            setModel(event.currentTarget);
        } else {
            setModel(null);
        }
        console.log(model)
    };


    const [anchorEl, setAnchorEl] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const handleModelClose = (model) => {
        setModel(null);
        if (model) {
            setSelectedModel(model);
        }
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

    const handleFileChange = async (event) => {
        setUploadImage('')
        setIsLoading(false)
        const selectedFile = event.target.files[0]
        const img = new Image();
        img.src = URL.createObjectURL(selectedFile);
        img.onload = () => {
            setImageDimensions({ width: img.width, height: img.height });
        };

        const url = await fal.storage.upload(selectedFile);
        console.log("Handle", url)
        // inputUrl.current.value = url
        setUploadImage(url);
    };

    console.log(uploadImage)

    // const handleGenerateImage = () => {
    //     if (generateImage) {
    //         generateImage();
    //     }
    //     setIsLoading(true)
    // };
    // console.log('Up', uploadImage)


    const customGenerate = async () => {
        console.log('adfafasfafafasfs', uploadImage)
        console.log("model", selectedModel)
        setNewImage(null)
        setIsLoading(true)
        try {
            const result = await fal.subscribe(`fal-ai/${selectedModel}`, {
                input: {
                    image_url: uploadImage,
                },
                logs: true,
                onQueueUpdate: (update) => {
                    if (update.status === "IN_PROGRESS") {
                        update.logs.map((log) => log.message).forEach(console.log);
                    }
                },
                
            });
            setNewImage(result.image.url);
            setIsLoading(true)
        } catch (error) {
            // setError('Error generating image');
            setIsLoading(false)
            console.error('Error generating image:', error);
        }
        // setLoading(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>

            <div className='Upscale_head' >
                <h1><span>Sharpen images online</span> to make photos clearer</h1>
                <p>Use Picsart’s AI image sharpener to get rid of blur, uncover details, and instantly make photos clear. Always present a clear vision online and say goodbye to blurry and ruined photos.</p>
            </div>
            
            <Grid container style={{ paddingBottom:'30px'}}>
                {showDiv ? (
                <div className={`fade-out ${!showDiv && 'hidden'}`}>
                    <img src='/edit/sharpen.jpg' height={'300px'} width={'600px'}/>
                </div>
                ) : (
                <Grid item style={{marginLeft:'180px', boxShadow:'0 0 10px 2px rgba(161, 161, 161, 0.5)', borderRadius:'10px'}} className="fade-in">
                    <Card>
                        <CardContent style={{ width:'560px', minHeight:'285px'}}>
                            <Grid container style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h5">Input</Typography>

                                <div>
                                    <Button
                                        variant="outlined"
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        onClick={handleModelClick}
                                        endIcon={<ArrowDropDownIcon />}
                                        style={{color:'#C209C1', border:'1px solid #C209C1'}}
                                    >
                                        {selectedModel}
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={model}
                                        keepMounted
                                        open={Boolean(model)}
                                        onClose={() => handleModelClick(null)}
                                    >
                                        <MenuItem onClick={() => handleModelClose('aura-sr')}>AuraSR</MenuItem>
                                        <MenuItem onClick={() => handleModelClose('clarity-upscaler')}>Clarity Upscaler</MenuItem>
                                        <MenuItem onClick={() => handleModelClose('ccsr')}>CCSR Upscaler</MenuItem>

                                    </Menu>
                                </div>
                            </Grid>
                    
                            <Grid container style={{ display: 'flex', justifyContent: 'space-between' , marginBottom:'20px'}}>
                                <TextField
                                    // label="Image URL*"
                                    // variant="outlined"
                                    value={uploadImage}
                                    onChange={handleInputChange}
                                    // placeholder='Image URL'
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

                            <StyledBox>
                                <Typography variant="h6" component="div">
                                    Additional Settings
                                </Typography>

                                <Divider style={{ margin: '16px 0', width: '50%' }} />

                                <div>
                                    <IconButton
                                        aria-controls="more-menu"
                                        aria-haspopup="true"
                                        onClick={toggleExpanded}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'transparent', // Màu nền khi hover
                                            },
                                        }}
                                    >
                                        {expanded ? 'Less' : 'More'} <ArrowDropDownIcon />
                                    </IconButton>
                                </div>
                            </StyledBox>

                            <Typography variant="body2" color="textSecondary" gutterBottom style={{marginTop:'-20px', marginBottom:'50px'}}>
                                Customize your input with more control.
                            </Typography>

                            {expanded && selectedModel === 'aura-sr' &&
                                (<Aura uploadImage={uploadImage} setIsLoading = {setIsLoading} setNewImage={setNewImage} />)}

                            {expanded && selectedModel === 'clarity-upscaler' &&
                                (<Clarity uploadImage={uploadImage} setIsLoading = {setIsLoading} setNewImage={setNewImage} />)}

                            {expanded && selectedModel === 'ccsr' &&
                                (<CCSR uploadImage={uploadImage} setIsLoading = {setIsLoading} setNewImage={setNewImage} />)}

                            {expanded ? (
                                <>
                                </>
                            ) : (
                            <Box display="flex" justifyContent="flex-end" mt={2}>
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
                            )}

                        </CardContent>
                    </Card>
                </Grid>
                )}

                {/* Result Section */}
                {/* <Grid item style={{ boxShadow:'0 0 10px 2px rgba(161, 161, 161, 0.5)', width:'450px', height:'450px' }}> */}
                <div class="wrapper" style={{position: 'fixed', right: '200px'}} onClick={handleChange}>
                        <CardContent style={{ justifyContent: 'center', display:'flex', alignItems:'center', flexDirection:'column', width:'460px', height:'285px', boxShadow:'0 0 10px 2px rgba(161, 161, 161, 0.5)', borderRadius:'10px'}}>
                            <Typography variant='h4' paddingBottom={1} style={{fontWeight:'600', color:'#C209C1'}}>Result</Typography>

                            {isLoading ? (
                                <ImageResult uploadedImageUrl={uploadImage} imageUrl={newImage} imageDimensions={imageDimensions} />

                            ) : (
                                <LoadingBox style={{border:'3px dashed #C209C1', marginBottom:'-10px'}}>
                                    {/* <img src={UpIcon.src} style={{ width: '15%' , color:'#DEDEDE'}}></img> */}
                                    <ImFilesEmpty color='#DEDEDE' size={75}/>
                                    <Typography variant='h5' style={{marginTop:'15px', fontSize:'26px'}}>Let's pick a image to start</Typography>

                                </LoadingBox>
                            )}
                        </CardContent>
                </div>
                {/* </Grid> */}
            </Grid>
        </Box>
    );
}

export default Upscaling;
