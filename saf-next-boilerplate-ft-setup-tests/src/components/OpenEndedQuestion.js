import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const OpenEndedQuestion = ({ question }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6">{question}</Typography>
      <TextField fullWidth multiline rows={4} variant="outlined" />
    </Box>
  );
};

export default OpenEndedQuestion;
