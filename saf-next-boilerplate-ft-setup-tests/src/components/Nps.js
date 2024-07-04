import React from 'react';
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const NPSQuestion = ({ question }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6">{question}</Typography>
      <RadioGroup row>
        {Array.from({ length: 11 }, (_, index) => (
          <FormControlLabel key={index} value={String(index)} control={<Radio />} label={String(index)} />
        ))}
      </RadioGroup>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="body2">Not likely at all</Typography>
        <Typography variant="body2">Extremely likely</Typography>
      </Box>
    </Box>
  );
};

export default NPSQuestion;
