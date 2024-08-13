import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { chooseSampler } from '@/redux/optionsSlice';

const SamplerMenu = () => {
  const [sampler, setSampler] = React.useState('Euler');
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSampler(event.target.value);
  };

  dispatch(chooseSampler(sampler))

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="sampler-select-label"></InputLabel>
      <Select
        labelId="sampler-select-label"
        id="sampler-select"
        value={sampler}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 150, // Chiều cao tối đa của dropdown
              width: 150, // Chiều rộng của dropdown
            },
          },
        }}
        sx={{height:'35px', backgroundColor:'#F0F0F0', border:'none'}}
      >
        <MenuItem value="Euler">Euler</MenuItem>
        <MenuItem value="Euler Ancestral">Euler Ancestral</MenuItem>
        <MenuItem value="LMS">LMS</MenuItem>
        <MenuItem value="LMSK">LMS Karras</MenuItem>
        <MenuItem value="DPMS">DPM-Solver++</MenuItem>
        <MenuItem value="DPMSK">DPM-Solver++ Karras</MenuItem>
        <MenuItem value="DPM2MSDEK">DPM++ 2M SDE Karras</MenuItem>
        <MenuItem value="DDIM">DDIM</MenuItem>
        <MenuItem value="KDPM">KDPM</MenuItem>
        <MenuItem value="KDPMA">KDPM Ancestral</MenuItem>
        <MenuItem value="UniPC">UniPC</MenuItem>
        <MenuItem value="DEIS">DEIS</MenuItem>
        <MenuItem value="KDPMK">KDPM Karras</MenuItem>

      </Select>
    </FormControl>
  );
};

export default SamplerMenu;