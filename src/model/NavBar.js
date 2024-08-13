import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleShowMoreOptions } from '@/redux/optionsSlice';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const NavBar = ({ currentTab, handleTabChange}) => {
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        handleTabChange(newValue);
    };

    return (
        <div>
            <Typography
                variant='h5'
                component='div'
                sx={{
                    flexGrow: 1,
                    backgroundColor: 'white',
                    height: '55px',
                    paddingInline: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'

                }}>
                Select AI Model

                <IconButton onClick={() => dispatch(toggleShowMoreOptions())}>
                    <CloseIcon />
                </IconButton>
            </Typography>

            <AppBar position='static'>
                <Toolbar>
                    <Tabs value={currentTab} onChange={handleChange}>
                        <Tab value='all' label="All" />
                        <Tab value='general_art' label="General/Art" />
                        <Tab value='photorealism' label="Photorealism" />
                        <Tab value='style' label="Styles" />
                        <Tab value='anime' label="Anime" />
                        <Tab value='fav' label="Favourite" />
                    </Tabs>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default NavBar
