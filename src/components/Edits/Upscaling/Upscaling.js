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

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0]
        setImageFile(selectedFile);
        const img = new Image();
        img.src = URL.createObjectURL(selectedFile);
        img.onload = () => {
            setImageDimensions({ width: img.width, height: img.height });
        };

        const url = await fal.storage.upload(selectedFile);
        setUploadImage(url);
    };

    const handleGenerateImage = () => {
        if (generateImage) {
            generateImage();
        }
        setIsLoading(true)
    };
    console.log('Up', uploadImage)

    const customGenerate = async () => {
        console.log('adfafasfafafasfs', uploadImage)
        console.log("model", selectedModel)
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
            // console.log(result)
            // console.log(input)
            setNewImage(result.image.url);
            setIsLoading(true) // Adjust according to the actual result structure
            // console.log(result.image.url); // Adjust according to the actual result structure
        } catch (error) {
            // setError('Error generating image');
            console.error('Error generating image:', error);
        }
        // setLoading(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }} >

            <Grid container spacing={3.5} sx={{ height: '150px', paddingBottom: '25px' }} />

            <Grid container spacing={3.5} sx={{ backgroundColor: '#F5F5F5' }}>
                {/* Input Section */}
                <Grid item xs={12} md={6} style={{ paddingLeft: "120px" }}>
                    <Card>
                        <CardContent>
                            <Grid container style={{ gap: '30px', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h6">Input</Typography>

                                <div>
                                    <Button
                                        variant="outlined"
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        onClick={handleModelClick}
                                        endIcon={<ArrowDropDownIcon />}
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

                            <Grid container style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <TextField
                                    label="Image URL*"
                                    // variant="outlined"
                                    value={uploadImage}

                                    margin="normal"
                                    style={{ width: '60%', marginTop: '16px' }}
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
                                    >
                                        {expanded ? 'Less' : 'More'} <ArrowDropDownIcon />
                                    </IconButton>
                                </div>
                            </StyledBox>

                            {expanded && selectedModel === 'aura-sr' &&
                                (<Aura uploadImage={uploadImage} setGenerateImage={setGenerateImage} setNewImage={setNewImage} />)}

                            {expanded && selectedModel === 'clarity-upscaler' &&
                                (<Clarity uploadImage={uploadImage} setGenerateImage={setGenerateImage} setNewImage={setNewImage} />)}

                            {expanded && selectedModel === 'ccsr' &&
                                (<CCSR uploadImage={uploadImage} setGenerateImage={setGenerateImage} setNewImage={setNewImage} />)}


                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Customize your input with more control.
                            </Typography>
                            {/* <Box display="flex" justifyContent="flex-end" mt={2}>
                                <Button variant="outlined" color="secondary" style={{ marginRight: '8px' }}>
                                    Reset
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleGenerateImage}>
                                    Run
                                </Button>
                            </Box> */}

                            {expanded ? (
                                <Box display="flex" justifyContent="flex-end" mt={2}>
                                    <Button variant="outlined" color="secondary" style={{ marginRight: '8px' }}>
                                        Reset
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleGenerateImage}>
                                        Run
                                    </Button>
                                </Box>
                            ) : (
                            <Box display="flex" justifyContent="flex-end" mt={2}>
                                <Button variant="outlined" color="secondary" style={{ marginRight: '8px' }}>
                                    Reset
                                </Button>
                                <Button variant="contained" color="primary" onClick={customGenerate}>
                                    Run
                                </Button>
                            </Box>
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

export default Upscaling;
