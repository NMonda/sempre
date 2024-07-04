import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <Grid
      container
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 128, 0, 0.1)', // Fallback background color for Grid
      }}
    >
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          position: 'relative', // Ensure relative positioning for absolute child
          height: '100%', // Full height to match the Grid container
          backgroundImage: `url('/Nov.png')`, // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '24px',
            maxWidth: '80%', // Limit width to prevent overflow
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Futura',
              fontSize: '70px',
              fontWeight: 700,
              lineHeight: '87px',
              textAlign: 'left',
              color: '#FFF', // White color
              
              marginBottom: '24px',
              '@media (max-width: 600px)': {
                fontSize: '40px',
                lineHeight: '50px',
              },
            }}
          >
            An Awesome Value Prop for Safaricom Forms
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF', // White background color
          borderRadius: '12px', // Rounded corners
          padding: '24px',
        }}
      >
        <Box sx={{ marginBottom: '24px' }}>
          <Image src="/Layer_1.png" alt="Layer 1" width={216} height={48.2} />
        </Box>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
