import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardMedia, IconButton, Box, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormatDate from '../utils/FormatDate';
import { MoreHoriz } from '@mui/icons-material';

const QuestionnaireCard = ({ formId,form, onDelete, onDuplicate, onShare, onClick }) => {
  // const [title, setTitle] = useState('Default Title');
  // const [date, setDate] = useState('Default Date');
  const [image, setImage] = useState('./Nov.png'); // Default image
  const dateFormatter = FormatDate  

  // useEffect(() => {
  //   const fetchFormDetails = () => {
      // try {
      //   const storedForms = localStorage.getItem('forms');
      //   if (storedForms) {
      //     const forms = JSON.parse(storedForms);
      //     const form = forms.find(f => f.id === formId);
      //     if (form) {
      //       setTitle(form.title);
      //       setDate(new Date(form.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }));
      //       setImage(form.imageUrl || './Nov.png');
      //     }
      //   }
      // } catch (error) {
      //   console.error('Error fetching form details:', error);
      // }
  //   };

  //   fetchFormDetails();
  // }, [formId]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (event) => {
    event.stopPropagation(); // Prevent click propagation
    onDelete();
    handleMenuClose();
  };

  const handleDuplicate = () => {
    onDuplicate();
    handleMenuClose();
  };

  const handleShare = () => {
    onShare();
    handleMenuClose();
  };

  return (
    <Card 
      sx={{ 
        width: '284px', 
        height: '200px', 
        borderRadius: '12px', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer'
      }} 
      onClick={onClick}
    >
      <CardMedia
        component="img"
        sx={{ height: '106px' }}
        image={image}
        alt="Form Image"
      />
      <CardContent sx={{ padding: '16px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> 
          <Box>
          <Typography sx={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '130px', // Adjust the width as needed
      display: 'inline-block',
    }}  variant="subtitle1" component="div" gutterBottom>
          {form.formName}
        </Typography>
            <Typography variant="body2" color="text.secondary">
          {dateFormatter(form.date,false,true)}
        </Typography> 
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box> 
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <MoreHoriz />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
          <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
          <MenuItem onClick={handleShare}>Share</MenuItem>
        </Menu>
        </Box>
      </Box>
        </Box>
       
    
      </CardContent >
     
    </Card>
  );
};

export default QuestionnaireCard;
