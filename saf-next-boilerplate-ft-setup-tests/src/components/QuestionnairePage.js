import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Select, FormControl, InputLabel, Typography, CircularProgress } from '@mui/material';
import LikertQuestion from './LikertQuestion';
import NominalQuestion from './NominalQuestion';
import OpenEndedQuestion from './OpenEndedQuestion';
import CloseEndedQuestion from './CloseEndedQuestion';
import NavigationWrapper from './NavigationWrapper';

const QuestionnairePage = ({ formId }) => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('Likert');
  const [formDetails, setFormDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/forms/${formId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch form details.');
        }
        const data = await response.json();
        setFormDetails(data);
      } catch (error) {
        setError('Failed to fetch form details.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormDetails();
  }, [formId]);

  const addQuestion = () => {
    setQuestions([...questions, { text: questionText, type: questionType }]);
    setQuestionText('');
    setQuestionType('Likert');
  };

  const handleSubmit = () => {
    // Handle form submission and update CardContainer with title, date, and creator
    console.log('Form submitted:', questions);
  };

  if (loading) {
    return (
      <NavigationWrapper>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </NavigationWrapper>
    );
  }

  if (error) {
    return (
      <NavigationWrapper>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant="h6">{error}</Typography>
        </Box>
      </NavigationWrapper>
    );
  }

  return (
    <NavigationWrapper>
      <Box sx={{ padding: '24px', flex: 1 }}>
        <Typography variant="h4">{formDetails.title}</Typography>
        <Typography variant="subtitle1">{new Date(formDetails.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</Typography>
        <img src={formDetails.image} alt="Form" style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />

        <h1>Skiza Tune Satisfaction Survey</h1>
        {questions.map((question, index) => {
          switch (question.type) {
            case 'Likert':
              return <LikertQuestion key={index} question={question.text} />;
            case 'Nominal':
              return <NominalQuestion key={index} question={question.text} options={['Option 1', 'Option 2', 'Option 3']} />;
            case 'OpenEnded':
              return <OpenEndedQuestion key={index} question={question.text} />;
            case 'CloseEnded':
              return <CloseEndedQuestion key={index} question={question.text} options={['Option 1', 'Option 2', 'Option 3']} />;
            default:
              return null;
          }
        })}
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Question Text"
            variant="outlined"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Question Type</InputLabel>
            <Select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              label="Question Type"
            >
              <MenuItem value="Likert">Likert</MenuItem>
              <MenuItem value="Nominal">Nominal</MenuItem>
              <MenuItem value="OpenEnded">Open Ended</MenuItem>
              <MenuItem value="CloseEnded">Close Ended</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={addQuestion}>
            Add Question
          </Button>
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit Form
          </Button>
        </Box>
      </Box>
    </NavigationWrapper>
  );
};

export default QuestionnairePage;
