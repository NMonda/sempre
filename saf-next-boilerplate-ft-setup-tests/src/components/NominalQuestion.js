import React from 'react';
import { Box, FormControlLabel, Checkbox, Typography } from '@mui/material';

const NominalQuestion = ({ question, options }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6">{question}</Typography>
      {options.map((option, index) => (
        <FormControlLabel key={index} control={<Checkbox />} label={option} />
      ))}
    </Box>
  );
};

export default NominalQuestion;
