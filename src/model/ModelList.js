// src/ModelList.js
import React from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setSelectedModel, setShowMoreOptions } from '@/redux/optionsSlice';
import ModelSelection from './ModelSelection';
import ModelData from './ModelData';

// Dữ liệu mẫu cho các mô hình AI
const models = ModelData

const ModelList = ({ currentTab }) => {

  const dispatch = useDispatch(); // Sử dụng useDispatch

  const filteredModels = currentTab === 'all'
    ? models
    : models.filter(model => model.category === currentTab);

  const containerStyle = {
    maxHeight: '80vh', // hoặc một giá trị cố định như 500px
    overflowY: 'auto',
    padding: '16px' // tương đương với padding={2} của MUI
  };

  const handleModelClick = (model) => {
    console.log('Model clicked:', model.id); // Thêm console log để kiểm tra
    dispatch(setSelectedModel(model)); // Gửi action khi người dùng nhấp vào mô hình
    dispatch(setShowMoreOptions(false))
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={2}>
        {filteredModels.map((model, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3} onClick={() => handleModelClick(model)}>
            <ModelSelection title={model.title} image={model.image} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ModelList;
