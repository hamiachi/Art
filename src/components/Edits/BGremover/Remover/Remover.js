import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress, IconButton, Dialog, DialogContent } from '@mui/material';
import { styled } from '@mui/system';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import './Remover.css';

const UploadBox = styled(Box)(({ theme, isUpload }) => ({
    border: '3px dashed #C209C1',
    borderRadius: '12px',
    textAlign: 'center',
    color: '#9ca3af',
    position: 'relative',
    width: '455px',
    height: '280px',
    overflow: 'hidden',
    backgroundColor: isUpload ? '#767676' : 'white'
}));

const Image = styled('img')({
    maxHeight: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});

const Loader = styled(CircularProgress)({
    // top: '50%',
    // paddingTop:"50%",
    position: 'absolute',
    top: '40%',
    left: '45%',
    transform: 'translate(-50%, -50%)',
    height: '60px',
    color: 'white',
    // zIndex: 1, // Ensure loader is above the image
});

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#f2f2f2',
    color: 'black',
    borderRadius: '25px',
    '&:hover': {
        backgroundColor: '#b4b4b4',
    },
    marginTop: '20px',
}));

const Remover = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState(null)
    const [finalUrl, setFinalUrl] = useState(null);
    // const [backgroundImage, setBackgroundImage] = useState(null);
    const [isUpload, setIsUpload] = useState(false);
    const [viewOriginal, setViewOriginal] = useState(false);

    const handleFileInputChange = (e) => {
        let image = e.target.files?.[0];
        setSelectedFile(image || null);
        setImage(image)
        if (image) {
            handleFileUpload(image);
        }
    };

    const handleFileUpload = async (image) => {
        const formData = new FormData();
        formData.append("image_file", image);
        formData.append("size", "auto");

        const api_key = 'xWnVAg3tK9VXXz3FiuZYjSHP';
        setIsUpload(true)
        console.log("first", isUpload)

        try {
            const response = await axios.post("https://api.remove.bg/v1.0/removebg", formData, {
                headers: {
                    "X-Api-Key": api_key,
                },
                responseType: 'blob',
            });

            const url = URL.createObjectURL(response.data);
            setFinalUrl(url);
            setSelectedFile(null);
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setIsUpload(false);
            console.log("Larst", isUpload)

        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = finalUrl;
        link.download = 'processed_image.png';
        link.click();
    };

    const handleClose = () => {
        setFinalUrl(null);
    };

    const toggleView = () => {
        setViewOriginal(!viewOriginal);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bgcolor="#ffffff"
            width={'500px'}
        >
            <div className='box'>
                <UploadBox isUpload={isUpload}>
                    {selectedFile && (
                        <Image
                            src={URL.createObjectURL(selectedFile)}
                            alt="Original"
                        />
                    )}
                    {isUpload && (
                        <>
                            <Loader style={{ height: '60px', width: '60px' }} />
                            <Typography variant="h5" style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontWeight: '600', width: '100%' }}>
                                Removing the background
                            </Typography>
                        </>
                    )}
                    {!selectedFile && !finalUrl && (
                        <>
                            <UploadFileIcon style={{ fontSize: '5em', paddingTop: '40px', color:'#DEDEDE' }} />
                            <Typography variant="h5" gutterBottom style={{ paddingTop: '25px', paddingBottom: '10px', fontWeight: '500', color: 'black' }}>
                                Pick an image to remove
                            </Typography>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileInputChange}
                                style={{ display: 'none' }}
                                id="file-input"
                            />
                            <label htmlFor="file-input">
                                <Button variant="contained" color="secondary" component="span" style={{ borderRadius: '25px', width: '195px' , backgroundColor:'#C209C1', padding:'10px 0px'}} startIcon={<UploadFileIcon />}>
                                    Select a file
                                </Button>
                            </label>
                        </>
                    )}
                    {finalUrl && (
                        <>
                            <IconButton
                                style={{ position: 'absolute', top: 10, right: 10 }}
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>

                            <IconButton
                                style={{ position: 'absolute', top: 10, left: 10 }}
                                onClick={toggleView}
                            >
                                <VisibilityIcon />
                            </IconButton>

                            <Image
                                src={viewOriginal ? URL.createObjectURL(image) : finalUrl}
                            />
                        </>
                    )}
                </UploadBox>
            </div>

            {finalUrl &&
                <CustomButton
                    variant="contained"
                    color="primary"
                    onClick={handleDownload}
                    startIcon={<DownloadIcon />}
                    style={{ marginTop: '20px', color:'white', backgroundColor:'#C209C1' }}
                >
                    Download
                </CustomButton>
            }
        </Box>
    );
};

export default Remover;