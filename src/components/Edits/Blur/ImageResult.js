import React, { useState } from 'react';
import { Box,  Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { styled, keyframes } from '@mui/system';
import './Retouch.css'

import { color } from 'chart.js/helpers';
import ButtonGroup from '@mui/material/ButtonGroup';
import ShareIcon from '@mui/icons-material/Share';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { saveAs } from 'file-saver';

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
`;

const Square = styled(Box)(({ theme }) => ({
    width: '50px',
    height: '50px',
    backgroundColor: 'grey',
    margin: '10px',
    animation: `${pulse} 1.5s infinite`,
    opacity: 0.7,
}));




const ImageResult = ({ uploadedImageUrl, imageUrl, imageDimensions }) => {
    console.log("imadfmafm", uploadedImageUrl)
    console.log('adfasfs', imageUrl)
    console.log("imadfmafm", imageDimensions)

    const [open, setOpen] = useState(false);

    const handleShare = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCopyLink = () => {
        // Logic sao chép link
        // console.log('Link copied to clipboard!');
        // setOpen(false);
        navigator.clipboard.writeText(imageUrl)
            .then(() => {
                console.log('Link copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy link: ', err);
            });
    };

    const handleOpen = () => {
        // Logic mở liên kết ở tab mới
        const url = imageUrl;
        window.open(url, '_blank', 'noopener,noreferrer');
        console.log('Đã mở liên kết ở tab mới:', url);
    };

    const handleDownload = () => {
        // Logic tải xuống
        saveAs(imageUrl, 'image.jpeg')
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
            // width:'90%',
        }}>
            {uploadedImageUrl && imageUrl && imageDimensions ? (
                <>
                    <Box
                        sx={{
                            marginTop: 2,
                            height: imageDimensions.height ? `${imageDimensions.height}px` : 'auto',
                            width: imageDimensions.width ? `${imageDimensions.width}px` : 'auto',
                            overflow: 'hidden',
                            position: 'relative',
                            display: 'flex'

                        }}
                    >
                        <ImgComparisonSlider>
                            <figure slot="first" className="before">
                                <img width="f" src={uploadedImageUrl} alt="Before" />
                                <figcaption>Before</figcaption>
                            </figure>

                            <figure slot="second" className="after">
                                <img width="100%" src={imageUrl} alt="Before" />
                                <figcaption>After</figcaption>
                            </figure>

                        </ImgComparisonSlider>
                    </Box>

                    <Box display="flex" gap={2} paddingTop={5}>
                        <Button variant="outlined" startIcon={<ShareIcon />} onClick={handleShare}>
                            Share
                        </Button>
                        <Button variant="outlined" startIcon={<OpenInNewIcon />} onClick={handleOpen}>
                            Open
                        </Button>
                        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleDownload}>
                            Download
                        </Button>
                    </Box>

                    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                        <DialogTitle>
                            Share Result
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{ position: 'absolute', right: 8, top: 8 }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={imageUrl}
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{
                                    borderColor: '#B085F5',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#B085F5',
                                        },
                                    },
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                            <Button variant="contained" onClick={handleCopyLink} sx={{ backgroundColor: '#B085F5' }}>
                                Copy Link
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>


            ) : (
                // uploadedImageUrl && <Typography>Uploaded Image URL:</Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    height='550px'
                    justifyContent='center'
                >
                    <Box display="flex">
                        <Square />
                        <Square sx={{ animationDelay: '0.5s' }} />
                        <Square sx={{ animationDelay: '1s' }} />
                        <Square sx={{ animationDelay: '1.5s' }} />
                    </Box>
                    <Typography variant="body2" color="textSecondary" mt={2}>
                        Waiting for your input...
                    </Typography>
                </Box>

            )}


        </Box>
    )
}

export default ImageResult
