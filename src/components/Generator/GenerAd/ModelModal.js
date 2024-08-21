import React, { useState } from 'react';
import { Modal, Box, Typography, Grid, Card, CardMedia, CardContent, IconButton, Tabs, Tab, Button, TextField, InputAdornment } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ModelData from '@/model/ModelData';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PaletteIcon from '@mui/icons-material/Palette';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setSelectedModel } from '@/redux/optionsSlice';

const modelCategories = ModelData

const ModelModal = ({ open, handleClose }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // console.log(ModelData)


    const dispatch = useDispatch();
    const handleTabChange = (event, newValue) => setSelectedCategory(newValue);

    const toggleFavorite = (model) => {
        setFavorites(prevFavorites => {

            if (prevFavorites.includes(model)) {
                return prevFavorites.filter(fav => fav !== model);
            } else {
                return [...prevFavorites, model];
            }

        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const models = selectedCategory === 'Favourite' ? favorites : modelCategories[selectedCategory];

    const filteredModels = models.filter(model =>
        model.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleModelClick = (model) => {
        console.log("Model name: ", model)
        console.log('Model clicked:', model); // Thêm console log để kiểm tra
        handleClose()
        dispatch(setSelectedModel(model)); // Gửi action khi người dùng nhấp vào mô hình
        // dispatch(setShowMoreOptions(false))
    };

    return (
        <>
            {/* <Button onClick={handleOpen} variant="contained">Open Modal</Button> */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    height: '80vh',  // Thay đổi chiều cao tối đa của modal
                    overflowY: 'auto',  // Cho phép cuộn dọc
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2.5, borderBottom: '1px solid #303236' }}>
                        Select AI Model
                        <CancelIcon onClick={handleClose} />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, borderBottom: '1px solid #303236' }}>
                        <Tabs
                            value={selectedCategory}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{ borderBottom: 1, border: 'none', flexGrow: 1, fontSize: '10px' }}
                        >
                            <Tab icon={<FormatListBulletedIcon />} iconPosition="start" sx={{ fontSize: '15px' }} label="All" value="all" />
                            <Tab icon={<PhotoCameraIcon />} iconPosition="start" sx={{ fontSize: '15px' }} label="PhotoRealism" value="Photorealism" />
                            <Tab icon={<SmartToyIcon />} iconPosition="start" sx={{ fontSize: '15px' }} label="Anime" value="Anime" />
                            <Tab icon={<PaletteIcon />} iconPosition="start" sx={{ fontSize: '15px' }} label='Style' value='Styles' />
                            <Tab icon={<ThreeDRotationIcon />} iconPosition="start" sx={{ fontSize: '15px' }} label='3D' value='3D' />
                            <Tab icon={<FavoriteIcon />} iconPosition="start" sx={{ fontSize: '15px' }} label='Favourite' value='Favourite' />
                        </Tabs>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search models"
                            value={searchTerm}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment>
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                            onChange={handleSearchChange}
                            sx={{ flexBasis: '250px' }}

                        />
                    </Box>

                    <Grid container spacing={2.5} sx={{ mt: 2 }}>

                        {filteredModels.map((model, index) => (
                            <Grid item xs={2} key={index} onClick={() => handleModelClick(model)} >
                                <Card sx={{
                                    position: 'relative',
                                    maxWidth: 200,
                                    maxHeight: 200,
                                    border: '2px solid #E3A7E2',
                                    borderRadius: '8px',
                                    '&:hover .hoverIcons': {
                                        display: 'flex',
                                    },
                                }}>
                                    <CardMedia
                                        component="img"
                                        image={model.image.src}
                                        // alt={model.title}
                                        sx={{
                                            objectFit: 'cover',
                                            height: '100%',

                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                        }}
                                    >
                                        <CardContent paddingBottom='0' >
                                            <Typography gutterBottom variant="h7" paddingBottom='0' component="div" sx={{ color: 'white', fontWeight: '700', paddingBottom: 0 }}>
                                                {model.title}
                                            </Typography>
                                        </CardContent>
                                    </Box>

                                    <Box
                                        className="hoverIcons"
                                        sx={{
                                            display: 'none',
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            justifyContent: 'space-between',
                                            p: 1,
                                            width: '100%',
                                            boxSizing: 'border-box',
                                        }}
                                    >
                                        <IconButton onClick={() => toggleFavorite(model)}>
                                            <FavoriteIcon color={favorites.includes(model) ? 'error' : 'white'} />
                                        </IconButton>
                                        <IconButton>
                                            <CheckCircleIcon />
                                        </IconButton>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default ModelModal;
