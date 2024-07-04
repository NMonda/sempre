import React, { useState, useEffect } from 'react';
import {
  Box,Typography,TextField,Radio,RadioGroup,FormControlLabel,Button,Dialog,DialogTitle,DialogContent,DialogActions,IconButton,MenuItem,} from '@mui/material';
import NavigationWrapper from '../components/NavigationWrapper';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ViewFormPage = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem('forms')) || [];
    setForms(storedForms);

    const { id: formId } = router.query;
    if (formId) {
      console.log('Form ID from URL:', formId); // Debug statement
      const form = storedForms.find((f) => f.id === formId);
      if (form) {
        console.log('Form found:', form); // Debug statement
        setSelectedForm(form);
      } else {
        console.log('Form not found'); // Debug statement
        setSelectedForm(null);
      }
    }
  }, [router.query]);

  const handleDeleteForm = (form) => {
    const updatedForms = forms.filter((f) => f.id !== form.id);
    localStorage.setItem('forms', JSON.stringify(updatedForms));
    setForms(updatedForms);
    setSelectedForm(null);
  };

  const handleDeleteQuestion = (question) => {
    const updatedQuestions = selectedForm.questions.filter((q) => q.id !== question.id);
    const updatedForm = { ...selectedForm, questions: updatedQuestions };
    const updatedForms = forms.map((f) => (f.id === selectedForm.id ? updatedForm : f));
    localStorage.setItem('forms', JSON.stringify(updatedForms));
    setForms(updatedForms);
    setSelectedForm(updatedForm);
  };

  // const handleDuplicateQuestion = (question) => {
  //   const newQuestion = { ...question, id: uuidv4() };
  //   const updatedForm = { ...selectedForm, questions: [...selectedForm.questions, newQuestion] };
  //   const updatedForms = forms.map((f) => (f.id === selectedForm.id ? updatedForm : f));
  //   localStorage.setItem('forms', JSON.stringify(updatedForms));
  //   setForms(updatedForms);
  //   setSelectedForm(updatedForm);
  // };

  const handleEditQuestion = (question) => {
    setEditedQuestion({ ...question });
  };

  const handleSaveQuestion = () => {
    const updatedQuestions = selectedForm.questions.map((q) =>
      q.id === editedQuestion.id ? editedQuestion : q
    );
    const updatedForm = { ...selectedForm, questions: updatedQuestions };
    const updatedForms = forms.map((f) => (f.id === selectedForm.id ? updatedForm : f));
    localStorage.setItem('forms', JSON.stringify(updatedForms));
    setForms(updatedForms);
    setSelectedForm(updatedForm);
    setEditedQuestion(null);
  };

  return (
    <NavigationWrapper>
      <Box sx={{ padding: '24px' }}>
        <Typography variant="h4" gutterBottom>
          {selectedForm ? selectedForm.formName : 'No Form Selected'}
        </Typography>

        {selectedForm && (
          <Box sx={{ padding: '24px' }}>
            {selectedForm.questions && selectedForm.questions.length > 0 ? (
              selectedForm.questions.map((question, index) => (
                <Box
                  key={index}
                  sx={{
                    marginBottom: '16px',
                    padding: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                    }}
                  >
                    <Typography variant="h6">{question.text}</Typography>
                    <Box>
                      <IconButton onClick={() => handleEditQuestion(question)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteQuestion(question)}>
                        <DeleteIcon />
                      </IconButton>
                      {/* <Button onClick={() => handleDuplicateQuestion(question)}>
                        Duplicate
                      </Button> */}
                    </Box>
                  </Box>
                  {question.type === 'text' && (
                    <TextField variant="outlined" fullWidth disabled placeholder="Placeholder" />
                  )}
                  {question.type === 'multiple_choice' && (
                    <RadioGroup row>
                      <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                      <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                    </RadioGroup>
                  )}
                </Box>
              ))
            ) : (
              <Typography>No questions added yet.</Typography>
            )}

            <Dialog open={!!editedQuestion} onClose={() => setEditedQuestion(null)}>
              <DialogTitle>Edit Question</DialogTitle>
              <DialogContent>
                <TextField
                  label="Question"
                  value={editedQuestion?.text || ''}
                  onChange={(e) => setEditedQuestion({ ...editedQuestion, text: e.target.value })}
                  fullWidth
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  select
                  label="Type"
                  value={editedQuestion?.type || ''}
                  onChange={(e) => setEditedQuestion({ ...editedQuestion, type: e.target.value })}
                  fullWidth
                  sx={{ marginBottom: '16px' }}
                >
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="number">Number</MenuItem>
                  <MenuItem value="multiple_choice">Multiple Choice</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                </TextField>
                <TextField
                  label="Mandatory"
                  select
                  value={editedQuestion?.isMandatory || false}
                  onChange={(e) => setEditedQuestion({ ...editedQuestion, isMandatory: e.target.value })}
                  fullWidth
                  sx={{ marginBottom: '16px' }}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </TextField>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="primary" onClick={handleSaveQuestion}>
                  Save
                </Button>
                <Button variant="contained" onClick={() => setEditedQuestion(null)}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            <Button variant="contained" onClick={() => handleDeleteForm(selectedForm)}>
              Delete Form
            </Button>
            <Button variant="contained" onClick={() => router.push('/home')}sx={{ marginLeft: '800px' }} >
              Home 
            </Button>
          </Box>
        )}
      </Box>
    </NavigationWrapper>
  );
};

export default ViewFormPage;
