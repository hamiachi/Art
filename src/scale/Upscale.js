// import ImageSlider from "react-image-comparison-slider";
// import * as fal from "@fal-ai/serverless-client";
// import React, { useState } from 'react';
// import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';

// fal.config({
//   credentials: "65b7fc8c-1ba4-4c55-b9bb-a35cfffcd110:b75ad2c0c163e9bee02f5780d1df1f8e",
// });

// const UpScale = () => {
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
//   const [error, setError] = useState(null);
//   const [file, setFile] = useState(null);
//   const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });


//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0]
//     setFile(selectedFile);

//     const img = new Image();
//     img.src = URL.createObjectURL(selectedFile);
//     img.onload = () => {
//       setImageDimensions({ width: img.width, height: img.height });
//       // setUploadedImageUrl(img.src); // Cập nhật URL ảnh
//     };
//   };

//   const uploadImage = async () => {
//     if (!file) {
//       setError('Please select a file first.');
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       const url = await fal.storage.upload(file);
//       setUploadedImageUrl(url);
//       generateImage(url);
//     } catch (error) {
//       setError('Error uploading image');
//       console.error('Error uploading image:', error);
//       setLoading(false);
//     }
//   };

//   const generateImage = async (uploadedUrl) => {
//     try {
//       const result = await fal.subscribe("fal-ai/aura-sr", {
//         input: {
//           image_url: uploadedUrl,
//           checkpoint: "v2"
//         },
//         logs: true,
//         onQueueUpdate: (update) => {
//           if (update.status === "IN_PROGRESS") {
//             update.logs.map((log) => log.message).forEach(console.log);
//           }
//         },
//       });
//       setImageUrl(result.image.url); // Adjust according to the actual result structure
//       console.log(result.image.url); // Adjust according to the actual result structure
//     } catch (error) {
//       setError('Error generating image');
//       console.error('Error generating image:', error);
//     }
//     setLoading(false);
//   };

//   const handleImageLoad = (event) => {
//     const { naturalWidth, naturalHeight } = event.target;
//     setImageDimensions({ width: naturalWidth, height: naturalHeight });
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h4">UpScale</Typography>
//       <TextField
//         type="file"
//         onChange={handleFileChange}
//         fullWidth
//         sx={{ marginBottom: 2 }}
//       />
//       <Button
//         variant="contained"
//         onClick={uploadImage}
//         disabled={loading || !file}
//       >
//         {loading ? <CircularProgress size={24} /> : 'Upload and Generate Image'}
//       </Button>
//       {error && <Typography color="error">{error}</Typography>}

//       {uploadedImageUrl && imageUrl ? (
//         <Box
//           sx={{
//             marginTop: 2,
//             height: imageDimensions.height ? `${imageDimensions.height}px` : 'auto',
//             width: imageDimensions.width ? `${imageDimensions.width}px` : 'auto',
//             overflow: 'hidden',
//             position: 'relative',
//           }}
//         >
//           <ImageSlider
//             image1={uploadedImageUrl}
//             image2={imageUrl}
//             onSlide={() => {
//               console.log("sliding");
//             }}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'contain',
//               position: 'absolute',
//             }}
//           />
//         </Box>
//       ) : (
//         uploadedImageUrl && <Typography>Uploaded Image URL:</Typography>
//       )}
//     </Box>
//   );
// };

// export default UpScale;
import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';

const UpScale = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Thực hiện logic xử lý ảnh tại đây
    setLoading(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <TextField
        label="Image URL"
        variant="outlined"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginBottom: '1rem' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Run'}
      </Button>
    </Box>
  );
};

export default UpScale;