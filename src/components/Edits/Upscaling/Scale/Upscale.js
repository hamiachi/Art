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