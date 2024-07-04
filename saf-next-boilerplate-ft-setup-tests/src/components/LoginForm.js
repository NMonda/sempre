import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const router = useRouter();

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!email) {
      formIsValid = false;
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      errors.email = 'Email is invalid';
    }

    if (!password) {
      formIsValid = false;
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', { email, password });
      router.push('/home');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '400px' }}>
      <Box sx={{ marginBottom: '24px' }}>
        <TextField
          id="outlined-email-input"
          label="Email address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Box>
      <Box sx={{ marginBottom: '24px' }}>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{
            borderRadius: '50px',
            width: '127px',
            height: '48px',
            opacity: 1,
          }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
