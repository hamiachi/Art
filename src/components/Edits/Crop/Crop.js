import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Box, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/system';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CropIcon from '@mui/icons-material/Crop';
import CloseIcon from '@mui/icons-material/Close';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import './Style.css';
import { color } from 'chart.js/helpers';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';


const UploadContainer = styled(Box)({
    border: '2px dashed #ccc',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#FCFCFC',
    cursor: 'pointer',
    '&:hover': {
        borderColor: '#aaa',
    },
});

const RatioButtonGroup = styled(ToggleButtonGroup)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 'auto',
    width: '100%',
    gap: '10px',
    backgroundColor: '#fcfcfc',
    height: '20%',
});

const RatioButton = styled(Button)({
    borderRadius: '10px',
    minWidth: '50px',
    height: '50px',
    padding: '0',
    borderColor: '#ccc',
    backgroundColor: '#f7f7f7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ccc',
    '&:hover': {
        backgroundColor: '#F7F7F7',
    }
});

const CustomButton = styled(Button)({
    backgroundColor: '#c209c1',
    borderRadius: '50px',
    color: 'white',
    padding: '10px 24px',
    textTransform: 'none',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#920792',
    },
    '& .MuiButton-startIcon': {
        marginRight: '8px',
    },
    width: '195px'
});

const Crop = () => {
    const [imageSrc, setImageSrc] = useState('');
    const [fileName, setFileName] = useState('');
    const [cropper, setCropper] = useState(null);
    const [heightInput, setHeightInput] = useState(0);
    const [widthInput, setWidthInput] = useState(0);
    const [ratioSelection, setRatioSelection] = useState('custom')
    const [previewSrc, setPreviewSrc] = useState(null);
    const [apply, setApply] = useState(false)
    const [viewOriginal, setViewOriginal] = useState(false);

    const imageRef = useRef(null);

    useEffect(() => {
        if (imageSrc && imageRef.current) {
            const cropperInstance = new Cropper(imageRef.current);
            setCropper(cropperInstance);
        }
    }, [imageSrc]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageSrc(reader.result);
            setFileName(file.name.split('.')[0]);
        };
    };

    const handleAspectRatioChange = (ratio) => {
        console.log(ratio)
        setRatioSelection(ratio)
        if (cropper) {
            if (ratio === 'custom') {
                cropper.setAspectRatio(NaN);
            } else {
                cropper.setAspectRatio(eval(ratio.replace(':', '/')));
            }
        }
    };

    const getButtonStyle = (value) => (
        {
            color: ratioSelection === value ? '#3F00A3' : '#C9C9C9',
            border: ratioSelection === value ? '2px solid #3F00A3' : '#C9C9C9',
            '& .MuiSvgIcon-root': {
                color: ratioSelection === value ? '#3F00A3' : '#C9C9C9',
            },
        }
    )

    const handlePreview = (event) => {
        event.preventDefault();
        if (cropper) {
            const croppedCanvas = cropper.getCroppedCanvas({});
            const croppedImage = croppedCanvas.toDataURL();
            setPreviewSrc(croppedImage);
        }
        setApply(true)
    };

    const handleDownload = () => {
        saveAs(previewSrc, 'filename.jpg');
    };

    const handleReset = () => {
        setImageSrc('');
        setCropper(null);
        setPreviewSrc(null);
        setApply(false);
    };
    
    const handleCropAgain = () => {
        setPreviewSrc(null)
        setApply(false)
    }
    // console.log(previewSrc)
    const toggleView = () => {
        setViewOriginal(!viewOriginal);
    };
    return (

        <Box>
            <Card sx={{ width: '500px', margin: 'auto', mt: 4, textAlign: 'center', backgroundColor: '#F2F2F2', boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)' }}>
                <CardContent
                    style={{ height: '320px', position: 'relative', paddingTop: imageSrc ? '0' : '5%', paddingBottom: 0, paddingRight: 0, paddingLeft: 0, }}>
                    {imageSrc ? (
                        <>

                            <IconButton
                                onClick={handleReset}
                                sx={{ position: 'absolute', top: 8, right: 8, color: 'black', zIndex: 10 }}
                            >
                                <CloseIcon />
                            </IconButton>

                            <Box style={{ height: '80%', display: apply && 'none' }}>
                                <img id="image" src={imageSrc} ref={imageRef} alt="To be cropped" />
                            </Box>

                            <Box style={{ height: '80%', display: !apply ? 'none' : 'flex', justifyContent: 'center', alignItems:'center' }}>
                                <img id="image" src={ viewOriginal ? imageSrc : previewSrc} alt="To be cropped" />
                            </Box>

                            <RatioButtonGroup aria-label="crop ratio">
                                {previewSrc ? (
                                    <CustomButton id="preview" onClick = {handleCropAgain} startIcon={<CropIcon />} sx={{
                                        border: '2px solid #d764d7',
                                        color: '#d764d7',
                                        backgroundColor: '#fcfcfc'

                                    }}>
                                        Crop this image
                                    </CustomButton>
                                ) : (
                                    <RatioButtonGroup>
                                        <RatioButton value="custom"
                                            onClick={() => handleAspectRatioChange('custom')}
                                            sx={getButtonStyle('custom')}>
                                            <Box sx={{ mb: 0.5 }}>
                                                <CropIcon sx={{ fontSize: '15px' }} />
                                            </Box>
                                            <Box sx={{ fontSize: '8px', fontWeight: 'lighter' }}>Custom</Box>
                                        </RatioButton >

                                        <RatioButton value="1:1"
                                            onClick={() => handleAspectRatioChange('1:1')}
                                            sx={getButtonStyle("1:1")}>
                                            <Box sx={{ mb: 0.5 }}>
                                                <AspectRatioIcon sx={{ fontSize: '15px' }} />
                                            </Box>
                                            <Box sx={{ fontSize: '10px', fontWeight: 'lighter' }}>1:1</Box>
                                        </RatioButton >


                                        <RatioButton value="3:2"
                                            onClick={() => handleAspectRatioChange('3:2')}
                                            sx={getButtonStyle("3:2")}
                                        >

                                            <Box sx={{ mb: 0.5 }}>
                                                <AspectRatioIcon sx={{ fontSize: '15px' }} />
                                            </Box>
                                            <Box sx={{ fontSize: '10px', fontWeight: 'lighter' }}>3:2</Box>
                                        </RatioButton >

                                        <RatioButton value="2:3"
                                            onClick={() => handleAspectRatioChange('2:3')}
                                            sx={getButtonStyle("2:3")}
                                        >
                                            <Box sx={{ mb: 0.5 }}>
                                                <AspectRatioIcon sx={{ fontSize: '15px' }} />
                                            </Box>
                                            <Box sx={{ fontSize: '10px', fontWeight: 'lighter' }}>2:3</Box>
                                        </RatioButton >

                                        <RatioButton value="4:3"
                                            onClick={() => handleAspectRatioChange('4:3')}
                                            sx={getButtonStyle("4:3")}
                                        >
                                            <Box sx={{ mb: 0.5 }}>
                                                <AspectRatioIcon sx={{ fontSize: '15px' }} />
                                            </Box>
                                            <Box sx={{ fontSize: '10px', fontWeight: 'lighter' }}>4:3</Box>
                                        </RatioButton >

                                        <RatioButton value="3:4"
                                            onClick={() => handleAspectRatioChange('3:4')}
                                            sx={getButtonStyle("3:4")}
                                        >
                                            <Box sx={{ mb: 0.5 }}>
                                                <AspectRatioIcon sx={{ fontSize: '15px' }} />
                                            </Box>
                                            <Box sx={{ fontSize: '10px', fontWeight: 'lighter' }}>3:4</Box>
                                        </RatioButton >

                                        <RatioButton value="9:16"
                                            onClick={() => handleAspectRatioChange('9:16')}
                                            sx={getButtonStyle("9:16")}
                                        >
                                            <Box sx={{ mb: 0.5 }}>
                                                <AspectRatioIcon sx={{ fontSize: '15px' }} />
                                            </Box>
                                            <Box sx={{ fontSize: '10px', fontWeight: 'lighter' }}>9:16</Box>
                                        </RatioButton >

                                        <RatioButton value="16:9"
                                            onClick={() => handleAspectRatioChange('16:9')}
                                            sx={getButtonStyle("16:9")}
                                        >
                                            <Box sx={{ mb: 0.5 }}>
                                                <AspectRatioIcon sx={{ fontSize: '15px' }} />
                                            </Box>
                                            <Box sx={{ fontSize: '10px', fontWeight: 'lighter' }}>16:9</Box>
                                        </RatioButton >
                                    </RatioButtonGroup>
                                )}
                            </RatioButtonGroup>
                        </>
                    ) : (
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                <CropIcon sx={{ fontSize: 50, color: '#9c27b0' }} />
                            </Box>

                            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                                Crop Image
                            </Typography>

                            <UploadContainer>
                                <Typography variant="body2" color="text.secondary">
                                    Drag and drop a file or
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                    id="file-input"
                                />
                                <label htmlFor="file-input">
                                    <Button variant="contained" color="secondary" component="span" startIcon={<UploadFileIcon />}>
                                        Select a file
                                    </Button>
                                </label>
                            </UploadContainer>
                        </>
                    )}

                </CardContent>
            </Card>

            <div className="btns">

                {imageSrc && (

                    <>
                        {apply ? (
                            <>
                                <CustomButton id="cancel" onClick={toggleView} sx={{ backgroundColor: ' #f2f2f2', '&:hover': { backgroundColor: '#313131' } }} startIcon={<CancelIcon />}>
                                    Original Image
                                </CustomButton>

                                <CustomButton id='download' onClick={handleDownload} startIcon={<DownloadIcon />} >
                                    Download
                                </CustomButton>
                            </>
                        ) : (
                            <>
                                <CustomButton id="cancel" sx={{ backgroundColor: ' #f2f2f2', '&:hover': { backgroundColor: '#313131' } }} startIcon={<CancelIcon />}>
                                    Cancel
                                </CustomButton>

                                <CustomButton id="preview" onClick={handlePreview} startIcon={<CheckIcon />}>
                                    Apply
                                </CustomButton>
                            </>
                        )}
                    </>
                )}
            </div>
        </Box>
    );
};

export default Crop;
