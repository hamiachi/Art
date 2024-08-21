import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Card, CardContent, IconButton } from '@mui/material';
import { Menu, MenuItem, Divider, Select, Switch, FormControlLabel, InputLabel, FormControl } from '@mui/material';
import * as fal from "@fal-ai/serverless-client";
fal.config({
    credentials: "65b7fc8c-1ba4-4c55-b9bb-a35cfffcd110:b75ad2c0c163e9bee02f5780d1df1f8e"
});
const Aura = ({ uploadImage, setIsLoading, setNewImage }) => {
    const [upscaleFactor, setUpscaleFactor] = useState(4)
    const [tile, setTile] = useState(false)
    const [version, setVersion] = useState('v1')
    // const [newImage, setNewImage] = useState(null)

    const handleUpscaleChange = (event) => {
        setUpscaleFactor(event.target.value);
    };

    const handletileChange = (event) => {
        setTile(event.target.checked)
    }

    const handleVersionChange = (event) => {
        setVersion(event.target.value)
    }

    const handleReset = () => {
        setUpscaleFactor(4);
        setTile(false);
        setVersion('v1')

    }
    const generateImage = async () => {
        setIsLoading(true)
        setNewImage(null)
        try {
            const result = await fal.subscribe("fal-ai/aura-sr", {
                input: {
                    image_url: uploadImage,
                    "upscaling_factor": 4,
                    "overlapping_tiles": tile,
                    checkpoint: version
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
            setIsLoading(false)
            console.error('Error generating image:', error);
        }
        // setLoading(false);
    };

    return (
        <div>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <Box display="flex" flexDirection="column" gap={4}>

                <Box alignItems="center" flexDirection="column">
                    <Typography style={{ paddingBottom: '5%' }}>Upscaling Factor (Xs)</Typography>

                    <FormControl fullWidth>
                        <InputLabel id="upscale-factor-label">Select the Upscaling Factor (Xs)</InputLabel>
                        <Select
                            labelId="upscale-factor-label"
                            value={upscaleFactor}
                            onChange={handleUpscaleChange}
                            displayEmpty
                            defaultValue=""
                            style={{ width: '100%' }}
                        >
                            <MenuItem value="4">Default</MenuItem>
                            <MenuItem value="4.0">4</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box alignItems="center" flexDirection="column">
                    <Typography>Overlapping Tiles</Typography>
                    <FormControlLabel control={<Switch checked={tile} onChange={handletileChange} />} />
                </Box>

                <Box alignItems="center" flexDirection="column">
                    <Typography style={{ paddingBottom: '5%' }}>Checkpoint</Typography>
                    <Select
                        defaultValue="v1"
                        labelId="upscale-factor-label"
                        value={version}
                        onChange={handleVersionChange}
                        // style={{ width: '100%' }}
                        style={{ width: '30%' }}
                    >
                        <MenuItem value="v1">v1</MenuItem>
                        <MenuItem value="v2">v2</MenuItem>
                    </Select>
                </Box>

                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button variant="outlined" color="secondary" style={{ marginRight: '8px' }} onClick={handleReset}>
                        Reset
                    </Button>
                    <Button variant="contained" color="primary" onClick={generateImage}>
                        Run
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default Aura
