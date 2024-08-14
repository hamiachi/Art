import React, { useState } from 'react';
import {
    Button, IconButton, Typography, Box, Divider, Select, MenuItem, Switch, FormControlLabel, Slider, TextField
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/system';
import * as fal from "@fal-ai/serverless-client";
fal.config({
    credentials: "65b7fc8c-1ba4-4c55-b9bb-a35cfffcd110:b75ad2c0c163e9bee02f5780d1df1f8e"
});

const StyledBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
});
const CCSR = ({ uploadImage, setGenerateImage, setNewImage }) => {

    const [scale, setScale] = useState(2);
    const [tileDiffusion, setTileDiffusion] = useState('none');
    const [tileDiffusionSize, setTileDiffusionSize] = useState(1024);
    const [tileDiffusionStride, setTileDiffusionStride] = useState(512);

    const generateImage = async () => {
        try {
            const result = await fal.subscribe("fal-ai/ccsr", {
                input: {
                    image_url: uploadImage,
                    "scale": scale,
                    "tile_diffusion": tileDiffusion,
                    "tile_diffusion_size": tileDiffusionSize,
                    "tile_diffusion_stride": tileDiffusionStride
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

    return (
        <div>
            <Box display="flex" flexDirection="column" gap={2}>

                {/* Scale */}
                <Box>
                    <Typography>Scale</Typography>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Slider
                            defaultValue={2}
                            min={1}
                            max={4}
                            step={0.1}
                            onChange={(e, newValue) => setScale(newValue)}
                            style={{ width: '80%' }}
                        />
                        <TextField
                            value={scale}
                            size="small"
                            onChange={(e) => setScale(parseFloat(e.target.value) || 0)}
                            style={{ width: '60px' }} />
                    </Box>
                </Box>

                <Box>
                    <Typography>Tile Diffusion</Typography>
                    <Select
                        value={tileDiffusion}
                        onChange={(e) => setTileDiffusion(e.target.value)}
                        style={{ width: '30%' }}
                    >
                        <MenuItem value="none">none</MenuItem>
                        <MenuItem value="option1">mix</MenuItem>
                        <MenuItem value="option2">gaussian</MenuItem>
                    </Select>
                </Box>

                <Box>
                    <Typography>Tile Diffusion Size</Typography>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Slider defaultValue={1024} min={256} max={2048} step={10} style={{ width: '80%' }} />
                        <TextField value={1024} size="small" style={{ width: '60px' }} />
                    </Box>
                </Box>


                <Box>
                    <Typography>Tile Diffusion Stride</Typography>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Slider
                            value={tileDiffusionSize}
                            min={256}
                            max={2048}
                            step={10}
                            onChange={(e, newValue) => setTileDiffusionSize(newValue)}
                            style={{ width: '80%' }}
                        />
                        <TextField value={512} size="small" style={{ width: '60px' }} />
                    </Box>
                </Box>

                <Box>
                    <Typography>Tile Diffusion Stride</Typography>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Slider
                            value={tileDiffusionStride}
                            min={128}
                            max={1024}
                            step={10}
                            onChange={(e, newValue) => setTileDiffusionStride(newValue)}
                            style={{ width: '80%' }}
                        />
                        <TextField
                            value={tileDiffusionStride}
                            size="small"
                            onChange={(e) => setTileDiffusionStride(parseFloat(e.target.value) || 0)}
                            style={{ width: '60px' }}
                        />
                    </Box>
                </Box>
            </Box>

        </div>
    );

}

export default CCSR
