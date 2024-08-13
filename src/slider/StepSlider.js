import React, { useState } from 'react'
import { Box, Slider, IconButton, TextField, Typography, colors } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setStepValue } from '@/redux/optionsSlice';


const StepSlider = () => {

    const dispatch = useDispatch(); // Sử dụng useDispatch
    const [value, setValue] = useState(25);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        // dispatch(setStepValue(value))
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
        // dispatch(setStepValue(value))

    };

    dispatch(setStepValue(value))

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={() => {
                setValue(value > 0 ? value - 1 : 0)
            }}>

            <RemoveIcon sx={{color: 'black'}}/>
            </IconButton>
            <Box flexGrow={1}>
                <Slider
                    value={typeof value === 'number' ? value : 0}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    sx={{
                        width: 150, // Chiều rộng của Slider
                        '& .MuiSlider-track': {
                            background: 'linear-gradient(to right, #3F0BBC, #FF34F9)', // Gradient cho track
                          },
                          '& .MuiSlider-thumb': {
                            background: '#FF34F9', // Gradient cho thumb
                          },
                          '& .MuiSlider-rail': {
                            background: '#FF34F9', // Gradient cho rail
                          },
                    }}
                />
            </Box>
            <IconButton onClick={() => {
                setValue(value < 100 ? value + 1 : 100)
                // dispatch(setStepValue(value))
            }} sx={{ marginRight:'29px'}}>

            <AddIcon sx={{color: 'black'}}/>
            </IconButton>
            <TextField
                value={value}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{style: { 
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    textAlign:'center',
                    padding: '10px 5px'
                }}}
                style={{ width: 45, marginLeft:'-30px'}}
            />
            <Typography sx={{marginRight:'30px'}}>Steps</Typography>
        </Box>
    )
}

export default StepSlider
