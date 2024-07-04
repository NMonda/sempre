import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import QuestionnaireCard from './QuestionnaireCard';
import CustomPagination from './Pagination';

const CardContainer = () => {
  const [forms, setForms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Default forms
    const defaultForms = Array(12).fill({
      id: `default_${Date.now()}`,
      title: 'Skiza Tune Satisfaction Survey',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      image: '/Nov.png',
    });

    // Fetch stored forms from local storage
    const storedForms = JSON.parse(localStorage.getItem('forms')) || [];

    // Combine default forms with stored forms
    const allForms = [...storedForms, ...defaultForms];
    setForms(allForms);
  }, []);

  const handleDeleteForm = (id) => {
    const updatedForms = forms.filter((form) => form.id !== id);
    setForms(updatedForms);
    localStorage.setItem('forms', JSON.stringify(updatedForms));
  };

  const handleDuplicateForm = (form) => {
    const newForm = { ...form, id: `duplicate_${Date.now()}` };
    const updatedForms = [...forms, newForm];
    setForms(updatedForms);
    localStorage.setItem('forms', JSON.stringify(updatedForms));
  };

  const handleShareForm = (form) => {
    const shareUrl = `${window.location.origin}/form/${form.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Form link copied to clipboard!');
  };

  const handleCardClick = (formId) => {
    router.push(`/response/${formId}`); // Navigate to the response page
  };

  return (
    <Box sx={{ paddingLeft: '24px', paddingRight: '24px' }}>
      <Grid container spacing={3} justifyContent="flex-start">
        {forms.map((form) => (
          <Grid item xs={12} sm={6} md={4} key={form.id}>
            <div style={{ cursor: 'pointer' }} onClick={() => handleCardClick(form.id)}>
              <QuestionnaireCard
               form = {form}
                title={form.title}
                date={form.date}
                image={form.image}
                onDelete={() => handleDeleteForm(form.id)}
                onDuplicate={() => handleDuplicateForm(form)}
                onShare={() => handleShareForm(form)}
              />
            </div>
          </Grid>
        ))}
      </Grid>
      <CustomPagination />
    </Box>
  );
};

export default CardContainer;
