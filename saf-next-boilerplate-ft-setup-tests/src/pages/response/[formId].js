import React from 'react';
import { useRouter } from 'next/router';
import ResponsePage from '../../components/ResponsePage';

const DynamicResponsePage = () => {
  const router = useRouter();
  const { formId } = router.query; // Extract the formId from the URL

  console.log('formId:', formId); // Add this line to debug

  // Ensure formId is defined before rendering the ResponsePage
  if (!formId) {
    return (
      <div>
        <p>formId is not defined</p>
        <NavigationWrapper>
          <Box sx={{ padding: '24px' }}>
            <Typography variant="h4" gutterBottom>
              Loading...
            </Typography>
          </Box>
        </NavigationWrapper>
      </div>
    );
  }

  return <ResponsePage formId={formId} />;
};

export default DynamicResponsePage;
