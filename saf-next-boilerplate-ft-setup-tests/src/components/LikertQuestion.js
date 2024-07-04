import React from 'react';
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const LikertQuestion = ({ question }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6">{question}</Typography>
      <RadioGroup row>
        <FormControlLabel value="1" control={<Radio />} label="Extremely Dissatisfied" />
        <FormControlLabel value="2" control={<Radio />} label="Dissatisfied" />
        <FormControlLabel value="3" control={<Radio />} label="Neutral" />
        <FormControlLabel value="4" control={<Radio />} label="Satisfied" />
        <FormControlLabel value="5" control={<Radio />} label="Extremely Satisfied" />
      </RadioGroup>
    </Box>
  );
};

export default LikertQuestion;
