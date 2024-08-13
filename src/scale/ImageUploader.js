import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function ImageUploader() {
    const [image, setImage] = useState(null);
    const [model, handleModel] = useState(null)

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box sx={{ flexGrow: 1 }} >

            <Grid container spacing={3.5} sx={{ height: '150px', paddingBottom: '25px' }} />

            <Grid container spacing={3.5} sx={{ backgroundColor: '#F5F5F5' }}>
                {/* Input Section */}
                <Grid item xs={12} md={6} style={{ paddingLeft: "120px" }}>
                    <Card>
                        <CardContent>
                            <Grid container style={{gap:'30px' , display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant="h6">Input</Typography>

                                <div>
                                    <Button
                                        variant="outlined"
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                        endIcon={<ArrowDropDownIcon />}
                                    >
                                        Model Selection
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>Option 1</MenuItem>
                                        <MenuItem onClick={handleClose}>Option 2</MenuItem>
                                        <MenuItem onClick={handleClose}>Option 3</MenuItem>
                                    </Menu>
                                </div>
                            </Grid>


                            <TextField
                                fullWidth
                                label="Image URL*"
                                variant="outlined"
                                margin="normal"
                            />
                            <Box>
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{ mt: 2 }}
                                >
                                    Choose...
                                    <input
                                        type="file"
                                        hidden
                                        // onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </Button>
                                {image && (
                                    <Box mt={2} sx={{ border: '1px solid black', maxWidth: 200 }}>
                                        <img src={image} alt="Preview" style={{ width: '100%' }} />
                                    </Box>
                                )}
                            </Box>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }}>Run</Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Result Section */}
                <Grid item xs={12} md={6} style={{ paddingRight: "105px" }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Result</Typography>
                            <Box sx={{ border: '1px dashed grey', minHeight: 200, padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography>Waiting for your input...</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ImageUploader;
