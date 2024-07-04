import React from 'react';
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const CloseEndedQuestion = ({ question, options }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6">{question}</Typography>
      <RadioGroup>
        {options.map((option, index) => (
          <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </Box>
  );
};

export default CloseEndedQuestion;
