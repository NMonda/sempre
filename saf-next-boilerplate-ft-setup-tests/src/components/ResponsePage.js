import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, TextField, Button, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Grid, Tooltip } from '@mui/material';
import NavigationWrapper from '../components/NavigationWrapper';

const ResponsePage = () => {
  const router = useRouter();
  const { formId } = router.query;
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});
  const [comment, setComment] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (formId) {
      const storedForms = JSON.parse(localStorage.getItem('forms')) || [];
      const selectedForm = storedForms.find((form) => form.id === formId);
      setFormData(selectedForm);
    }
  }, [formId]);

  useEffect(() => {
    if (formData && formData.questions.length > 0) {
      setCurrentQuestionIndex(0); // Start at the first question
    }
  }, [formData]);

  const handleResponseChange = (index, value) => {
    setResponses({
      ...responses,
      [index]: value,
    });

    // Check for branching logic
    const currentQuestion = formData.questions[index];
    if (currentQuestion.branching && currentQuestion.branching.answer === value) {
      const branchToIndex = currentQuestion.branching.branchTo;
      setCurrentQuestionIndex(branchToIndex + 1); // Jump to the next question after the branch
    } else {
      setCurrentQuestionIndex(index + 1); // Move to the next question
    }
  };

  const handleSubmit = () => {
    const response = {
      formId,
      responses,
      comment,
    };

    const storedResponses = JSON.parse(localStorage.getItem('responses')) || [];
    storedResponses.push(response);
    localStorage.setItem('responses', JSON.stringify(storedResponses));

    alert('Response submitted successfully!');
    router.push('/home');
  };

  if (!formData) {
    return (
      <NavigationWrapper>
        <Box sx={{ padding: '24px' }}>
          <Typography variant="h4">Loading form...</Typography>
        </Box>
      </NavigationWrapper>
    );
  }

  return (
    <NavigationWrapper>
      <Box sx={{ padding: '24px' }}>
        <Typography variant="h4">{formData.formName}</Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: '24px' }}>{formData.formDescription}</Typography>

        {formData.questions.slice(currentQuestionIndex, formData.questions.length).map((question, index) => (
          <Box key={currentQuestionIndex + index} sx={{ marginBottom: '16px' }}>
            <Tooltip title={question.note || ''} placement="right">
              <Typography variant="h6" sx={{ display: 'inline', cursor: 'help' }}>
                {question.text}
              </Typography>
            </Tooltip>

            {question.type === 'multiple_choice' && (
              <RadioGroup value={responses[currentQuestionIndex + index]} onChange={(e) => handleResponseChange(currentQuestionIndex + index, e.target.value)}>
                <Grid container spacing={2}>
                  {question.choices.map((choice, choiceIndex) => (
                    <Grid item xs={3} key={choiceIndex}>
                      <FormControlLabel
                        value={choice}
                        control={<Radio />}
                        label={choice}
                      />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            )}

            {question.type === 'text' && (
              <TextField
                fullWidth
                value={responses[currentQuestionIndex + index] || ''}
                onChange={(e) => handleResponseChange(currentQuestionIndex + index, e.target.value)}
              />
            )}

            {question.type === 'rating' && (
              <Select
                fullWidth
                value={responses[currentQuestionIndex + index] || ''}
                onChange={(e) => handleResponseChange(currentQuestionIndex + index, e.target.value)}
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <MenuItem key={rating} value={rating}>{rating}</MenuItem>
                ))}
              </Select>
            )}

            {question.type === 'number' && (
              <TextField
                type="number"
                fullWidth
                value={responses[currentQuestionIndex + index] || ''}
                onChange={(e) => handleResponseChange(currentQuestionIndex + index, e.target.value)}
              />
            )}
          </Box>
        ))}

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Comments"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ marginBottom: '16px' }}
        />

        <Button onClick={handleSubmit} sx={{ backgroundColor: '#4CAF50', color: '#FFF', marginTop: '16px' }}>
          Submit Response
        </Button>
      </Box>
    </NavigationWrapper>
  );
};

export default ResponsePage;
