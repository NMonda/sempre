import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent,
  MenuItem, Select, IconButton, Menu, Grid, List, ListItem, ListItemText,
  Stepper, Step, StepLabel, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NavigationWrapper from '../components/NavigationWrapper';
import { v4 as uuidv4 } from 'uuid';

const CreateFormPage = () => {
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [questions, setQuestions] = useState([
    { text: 'MSISDN', type: 'number', isMandatory: true, restrictions: 'number', branching: {} },
    {
      text: 'Status', type: 'multiple_choice', isMandatory: true, choices: [
        'Reached', 'Off', 'Roaming', 'Number busy', 'Not picking', 'Call later', 'Not Willing'
      ], branching: {}
    }
  ]);
  const [newQuestion, setNewQuestion] = useState({
    text: '', type: '', isMandatory: false, restrictions: 'none', choices: [''], branching: {}, note: ''
  });
  const [dueDate, setDueDate] = useState('');
  const [questionTypeDialogOpen, setQuestionTypeDialogOpen] = useState(false);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [branchingDialogOpen, setBranchingDialogOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const user = { name: 'Default User' }; // Placeholder for the user's name

  const steps = ['Form Details', 'Add Questions', 'Due Date & Delegate Rights'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion({
      text: '', type: '', isMandatory: false, restrictions: 'none', choices: [''], branching: {}, note: ''
    });
  };

  const handleAddChoice = (index) => {
    const updatedChoices = [...newQuestion.choices];
    updatedChoices.splice(index + 1, 0, '');
    setNewQuestion({ ...newQuestion, choices: updatedChoices });
  };

  const handleRemoveChoice = (index) => {
    const updatedChoices = [...newQuestion.choices];
    updatedChoices.splice(index, 1);
    setNewQuestion({ ...newQuestion, choices: updatedChoices });
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...newQuestion.choices];
    updatedChoices[index] = value;
    setNewQuestion({ ...newQuestion, choices: updatedChoices });
  };

  const handleQuestionTypeSelection = (type) => {
    setNewQuestion({ ...newQuestion, type, restrictions: 'none' }); // Reset restrictions for new question type
    setQuestionTypeDialogOpen(false);
  };

  const handleBranchingClick = (index) => {
    setCurrentQuestionIndex(index);
    setBranchingDialogOpen(true);
  };

  const handleBranchingClose = () => {
    setBranchingDialogOpen(false);
  };

  const handleBranchingSave = (branching) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].branching = branching;
    setQuestions(updatedQuestions);
    setBranchingDialogOpen(false);
  };

  const handleSubmit = () => {
    if (!formName) {
      alert('Form name is required.');
      return;
    }

    if (questions.length === 0) {
      alert('At least one question is required.');
      return;
    }
    
    const formData = {
      id: uuidv4(),//Generate a unique ID for the form
     formName, formDescription, questions, dueDate, user: user.name, date: new Date().toISOString(),
    };

    const storedForms = JSON.parse(localStorage.getItem('forms')) || [];
    storedForms.push(formData);
    localStorage.setItem('forms', JSON.stringify(storedForms));

    alert('Form submitted successfully!');
    router.push(`/viewForm?id=${formData.id}`); // Redirect to questions page after submission
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this form? This action cannot be undone.')) {
      setFormName('');
      setFormDescription('');
      setQuestions([]);
      setDueDate('');
      alert('Form deleted successfully.');
    }
  };

  const handleRestrictionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRestrictionsClose = () => {
    setAnchorEl(null);
  };

  const handleRestrictionsChange = (restriction) => {
    setNewQuestion({ ...newQuestion, restrictions: restriction });
    setAnchorEl(null);
  };

  const handleNoteClick = (index) => {
    setCurrentQuestionIndex(index);
    setNoteDialogOpen(true);
  };

  const handleNoteClose = () => {
    setNoteDialogOpen(false);
  };

  const handleNoteSave = (note) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].note = note;
    setQuestions(updatedQuestions);
  };

  const open = Boolean(anchorEl);

  return (
    <NavigationWrapper>
      <Box sx={{ padding: '24px' }}>
        <Typography variant="h4" gutterBottom>
          Create a Form
        </Typography>

        <Stepper activeStep={activeStep} sx={{ marginBottom: '24px' }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box>
            <TextField
              label="Form Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              fullWidth
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Form Description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={{ marginBottom: '24px' }}
            />
            <Button variant="contained" onClick={handleNext} sx={{ backgroundColor: '#4CAF50', color: '#FFF' }}>
              Next
            </Button>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Button
              variant="contained"
              onClick={() => setQuestionTypeDialogOpen(true)}
              sx={{ marginBottom: '16px', backgroundColor: '#4CAF50', color: '#FFF' }}
            >
              Add Question
            </Button>

            <Dialog open={questionTypeDialogOpen} onClose={() => setQuestionTypeDialogOpen(false)}>
              <DialogTitle>Select Question Type</DialogTitle>
              <DialogContent>
                <Button onClick={() => handleQuestionTypeSelection('multiple_choice')}>Choice</Button>
                <Button onClick={() => handleQuestionTypeSelection('text')}>Text</Button>
                <Button onClick={() => handleQuestionTypeSelection('rating')}>Rating</Button>
              </DialogContent>
            </Dialog>

            {newQuestion.type && (
              <Box sx={{ marginBottom: '24px' }}>
                <TextField
                  label="Question"
                  value={newQuestion.text}
                  onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                  fullWidth
                  sx={{ marginBottom: '16px' }}
                />

                {newQuestion.type === 'multiple_choice' && (
                  <Box sx={{ marginBottom: '16px' }}>
                    <Grid container spacing={2}>
                      {newQuestion.choices.map((choice, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                              label={`Choice ${index + 1}`}
                              value={choice}
                              onChange={(e) => handleChoiceChange(index, e.target.value)}
                              fullWidth
                            />
                            <IconButton onClick={() => handleAddChoice(index)}><AddIcon /></IconButton>
                            {newQuestion.choices.length > 1 && (
                              <IconButton onClick={() => handleRemoveChoice(index)}><RemoveIcon /></IconButton>
                            )}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {newQuestion.type === 'text' && (
                  <Box sx={{ marginBottom: '16px' }}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="textAnswerType"
                        name="textAnswerType"
                        value={newQuestion.restrictions}
                        onChange={(e) => handleRestrictionsChange(e.target.value)}
                      >
                        <FormControlLabel value="short_answer" control={<Radio />} label="Short Answer" />
                        <FormControlLabel value="long_answer" control={<Radio />} label="Long Answer" />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}

                {newQuestion.type === 'rating' && (
                  <Box sx={{ marginBottom: '16px' }}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="ratingScaleType"
                        name="ratingScaleType"
                        value={newQuestion.restrictions}
                        onChange={(e) => handleRestrictionsChange(e.target.value)}
                      >
                        <FormControlLabel value="rating_scale" control={<Radio />} label="Rating Scale" />
                        <FormControlLabel value="likert_scale" control={<Radio />} label="Likert Scale" />
                        <FormControlLabel value="nps_scale" control={<Radio />} label="NPS Scale" />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}

                <Button
                  variant="contained"
                  onClick={handleAddQuestion}
                  sx={{ marginTop: '16px', backgroundColor: '#4CAF50', color: '#FFF' }}
                >
                  Add Question
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleRestrictionsClick}
                  sx={{ marginTop: '16px', marginLeft: '8px' }}
                >
                  Restrictions: {newQuestion.restrictions}
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleRestrictionsClose}>
                  <MenuItem onClick={() => handleRestrictionsChange('none')}>None</MenuItem>
                  <MenuItem onClick={() => handleRestrictionsChange('text')}>Text</MenuItem>
                  <MenuItem onClick={() => handleRestrictionsChange('number')}>Number</MenuItem>
                  <MenuItem onClick={() => handleRestrictionsChange('both')}>Text & Number</MenuItem>
                </Menu>
              </Box>
            )}

            <List>
              {questions.map((question, index) => (
                <ListItem key={index}>
                  <ListItemText primary={question.text} secondary={`Type: ${question.type}, Mandatory: ${question.isMandatory}`} />
                  <Button
                    variant="outlined"
                    onClick={() => handleBranchingClick(index)}
                    sx={{ marginLeft: '8px' }}
                  >
                    Branching
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleNoteClick(index)}
                    sx={{ marginLeft: '8px' }}
                  >
                    Add Note
                  </Button>
                </ListItem>
              ))}
            </List>

            <Dialog open={noteDialogOpen} onClose={handleNoteClose}>
              <DialogTitle>Add Note</DialogTitle>
              <DialogContent>
                <TextField
                  label="Note"
                  value={questions[currentQuestionIndex]?.note || ''}
                  onChange={(e) => handleNoteSave(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={branchingDialogOpen} onClose={handleBranchingClose}>
              <DialogTitle>Configure Branching</DialogTitle>
              <DialogContent>
                <Typography variant="subtitle1">If the answer to this question is:</Typography>
                <Select
                  value={questions[currentQuestionIndex]?.branching?.answer || ''}
                  onChange={(e) => handleBranchingSave({
                    ...questions[currentQuestionIndex].branching,
                    answer: e.target.value
                  })}
                  fullWidth
                  sx={{ marginBottom: '16px' }}
                >
                  {questions[currentQuestionIndex]?.choices.map((choice, index) => (
                    <MenuItem key={index} value={choice}>{choice}</MenuItem>
                  ))}
                </Select>
                <Typography variant="subtitle1">Then branch to:</Typography>
                <Select
                  value={questions[currentQuestionIndex]?.branching?.branchTo || ''}
                  onChange={(e) => handleBranchingSave({
                    ...questions[currentQuestionIndex].branching,
                    branchTo: e.target.value
                  })}
                  fullWidth
                >
                  {questions.map((question, index) => (
                    <MenuItem key={index} value={index}>{question.text}</MenuItem>
                  ))}
                </Select>
              </DialogContent>
            </Dialog>

            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ backgroundColor: '#4CAF50', color: '#FFF', marginTop: '24px' }}
            >
              Next
            </Button>
            <Button variant="outlined" onClick={handleBack} sx={{ marginTop: '24px', marginLeft: '8px' }}>
              Back
            </Button>
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <TextField
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              fullWidth
              sx={{ marginBottom: '24px' }}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: '#4CAF50', color: '#FFF' }}
            >
              Submit
            </Button>
            <Button variant="outlined" onClick={handleBack} sx={{ marginLeft: '8px' }}>
              Back
            </Button>
          </Box>
        )}

        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{ marginTop: '24px' }}
        >
          Delete Form
        </Button>
      </Box>
    </NavigationWrapper>
  );
};

export default CreateFormPage;
