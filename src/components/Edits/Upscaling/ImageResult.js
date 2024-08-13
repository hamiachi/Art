import React from 'react'
import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';
import ImageSlider from "react-image-comparison-slider";
import { styled, keyframes } from '@mui/system';

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
    // console.log("imadfmafm",uploadedImageUrl)
    // console.log('adfasfs', imageUrl)
    // console.log("imadfmafm",imageDimensions)
    return (
        <div>
            {uploadedImageUrl && imageUrl && imageDimensions ? (
                <Box
                    sx={{
                        marginTop: 2,
                        height: imageDimensions.height ? `${imageDimensions.height}px` : 'auto',
                        width: imageDimensions.width ? `${imageDimensions.width}px` : 'auto',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <ImageSlider
                        image1={imageUrl}
                        image2={uploadedImageUrl}
                        onSlide={() => {
                            console.log("sliding");
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            position: 'absolute',
                        }}
                    />
                </Box>
            ) : (
                // uploadedImageUrl && <Typography>Uploaded Image URL:</Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
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
        </div>
    )
}

export default ImageResult
