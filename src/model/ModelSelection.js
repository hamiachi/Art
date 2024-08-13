import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ModelSelection = ({ image, title }) => {

  return (
    <div>
      <Card sx={{ maxWidth: 200, margin: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default ModelSelection
