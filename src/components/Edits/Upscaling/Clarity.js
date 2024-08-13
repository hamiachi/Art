import React, { useState, useRef } from 'react';
import { Button, Typography, Box, TextField, Slider, Tooltip, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import * as fal from "@fal-ai/serverless-client";
fal.config({
    credentials: "65b7fc8c-1ba4-4c55-b9bb-a35cfffcd110:b75ad2c0c163e9bee02f5780d1df1f8e"
});

const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '16px',
});

const Clarity = ({ uploadImage, setGenerateImage, setNewImage }) => {
    // const [prompt, setPrompt] = useState('masterpiece, best quality, highres');      
    let inputPromt = useRef('masterpiece, best quality, highres');
    const [upscaleFactor, setUpscaleFactor] = useState(2);
    // const [negativePrompt, setNegativePrompt] = useState('()');
    let inputNegativePrompt = useRef('worst quality, low quality, normal quality:2')
    const [creativity, setCreativity] = useState(0.35);
    const [resemblance, setResemblance] = useState(0.6);
    const [guidanceScale, setGuidanceScale] = useState(4);
    const [numInferenceSteps, setNumInferenceSteps] = useState(18);

    const handleReset = () => {
        // setPrompt('masterpiece, best quality, highres');
        setUpscaleFactor(2);
        // setNegativePrompt('(worst quality, low quality, normal quality:2)');
        setCreativity(0.35);
        setResemblance(0.6);
        setGuidanceScale(4);
        setNumInferenceSteps(18);
    };

    const generateImage = async () => {
        try {
            const result = await fal.subscribe("fal-ai/clarity-upscaler", {
                input: {
                    image_url: uploadImage,
                    "prompt": inputPromt.current.value,
                    "upscale_factor": upscaleFactor,
                    "negative_prompt": inputNegativePrompt.current.value,
                    "creativity": creativity,
                    "resemblance": resemblance,
                    "guidance_scale": guidanceScale,
                    "num_inference_steps": numInferenceSteps,
                },
                logs: true,
                onQueueUpdate: (update) => {
                    if (update.status === "IN_PROGRESS") {
                        update.logs.map((log) => log.message).forEach(console.log);
                    }
                },
            });
            console.log(result)
            setNewImage(result.image.url); // Adjust according to the actual result structure
            // console.log(result.image.url); // Adjust according to the actual result structure
        } catch (error) {
            // setError('Error generating image');
            console.error('Error generating image:', error);
        }
        // setLoading(false);
    };

    React.useEffect(() => {
        setGenerateImage(() => generateImage);
    }, [setGenerateImage]);
    const handleRun = () => {
        console.log('Running with settings:', {
            prompt, upscaleFactor, inputNegativePrompt, creativity,
            resemblance, guidanceScale, numInferenceSteps
        });
    };
    return (
        <div>
            <StyledBox>

                <Box>
                    <Typography>Prompt</Typography>
                    <Tooltip title="Enter your prompt here">
                        <IconButton>
                            <i className="fas fa-info-circle"></i>
                        </IconButton>
                    </Tooltip>
                    <TextField
                        inputRef={inputPromt}
                        defaultValue="masterpiece, best quality, highres"
                        multiline
                        fullWidth
                        sx={{ '& .MuiInputBase-root': { height: 100, borderRadius: '10px', alignItems: 'flex-start' } }}
                    />
                </Box>

                <Box>
                    <Typography>Upscale Factor</Typography>
                    <Tooltip title="Set the upscale factor">
                        <IconButton>
                            <i className="fas fa-info-circle"></i>
                        </IconButton>
                    </Tooltip>

                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Slider
                            value={upscaleFactor}
                            min={1}
                            max={4}
                            step={0.1}
                            onChange={(e, newValue) => setUpscaleFactor(newValue)}
                            style={{ width: '80%' }}
                        />
                        <TextField
                            value={upscaleFactor}
                            size="small"
                            onChange={(e) => setUpscaleFactor(parseFloat(e.target.value) || 0)}
                            style={{ width: '60px' }}
                        />
                    </Box>
                </Box>

                <Box>
                    <Typography>Negative Prompt</Typography>
                    <Tooltip title="Enter your negative prompt here">
                        <IconButton>
                            <i className="fas fa-info-circle"></i>
                        </IconButton>
                    </Tooltip>
                    <TextField
                        inputRef={inputNegativePrompt}
                        defaultValue="worst quality, low quality, normal quality:2"
                        multiline
                        fullWidth
                        sx={{ '& .MuiInputBase-root': { height: 100, borderRadius: '10px', alignItems: 'flex-start' } }}
                    />
                </Box>

                <Box>
                    <Typography>Creativity</Typography>
                    <Tooltip title="Set the creativity level">
                        <IconButton>
                            <i className="fas fa-info-circle"></i>
                        </IconButton>
                    </Tooltip>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Slider
                            value={creativity}
                            min={0}
                            max={1}
                            step={0.1}
                            onChange={(e, newValue) => setCreativity(newValue)}
                            style={{ width: '80%' }}
                        />
                        <TextField
                            value={creativity}
                            size="small"
                            onChange={(e) => setCreativity(parseFloat(e.target.value) || 0)}
                            style={{ width: '60px' }}
                        />
                    </Box>
                </Box>

                <Box>
                    <Typography>Resemblance</Typography>
                    <Tooltip title="Set the resemblance level">
                        <IconButton>
                            <i className="fas fa-info-circle"></i>
                        </IconButton>
                    </Tooltip>

                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Slider
                            value={resemblance}
                            min={0}
                            max={1}
                            step={0.1}
                            onChange={(e, newValue) => setResemblance(newValue)}
                            style={{ width: '80%' }}
                        />
                        <TextField
                            value={resemblance}
                            size="small"
                            onChange={(e) => setResemblance(parseFloat(e.target.value) || 0)}
                            style={{ width: '60px' }}
                        />
                    </Box>
                </Box>

                <Box>
                    <Typography>Guidance scale (CFG)</Typography>
                    <Tooltip title="Set the guidance scale">
                        <IconButton>
                            <i className="fas fa-info-circle"></i>
                        </IconButton>
                    </Tooltip>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Slider
                            value={guidanceScale}
                            min={0}
                            max={20}
                            step={0.5}
                            onChange={(e, newValue) => setGuidanceScale(newValue)}
                            style={{ width: '80%' }}
                        />
                        <TextField
                            value={guidanceScale}
                            size="small"
                            onChange={(e) => setGuidanceScale(parseFloat(e.target.value) || 0)}
                            style={{ width: '60px' }}
                        />
                    </Box>
                </Box>

                <Box>
                    <Typography>Num Inference Steps</Typography>
                    <Tooltip title="Set the number of inference steps">
                        <IconButton>
                            <i className="fas fa-info-circle"></i>
                        </IconButton>
                    </Tooltip>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Slider
                            value={numInferenceSteps}
                            min={4}
                            max={50}
                            step={1}
                            onChange={(e, newValue) => setNumInferenceSteps(newValue)}
                            style={{ width: '80%' }}
                        />
                        <TextField
                            value={numInferenceSteps}
                            size="small"
                            onChange={(e) => setNumInferenceSteps(parseFloat(e.target.value) || 0)}
                            style={{ width: '60px' }}
                        />
                    </Box>
                </Box>
            </StyledBox>
            {/* <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button variant="outlined" color="secondary" style={{ marginRight: '8px' }} onClick={handleReset}>
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={handleRun}>
          Run
        </Button>
      </Box> */}
        </div>
    )
}

export default Clarity
