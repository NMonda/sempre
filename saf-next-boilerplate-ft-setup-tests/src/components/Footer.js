import React from 'react';
import { Box, Typography, Link } from '@mui/material';


const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '80px',
        padding: '36px var(--Padding-Horizontal-Large, 24px)',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        borderTop: '1px solid #F6F6F6'
      }}
    >
      <Typography
        sx={{
          color: 'var(--Text-Secondary, #6B6B6B)',
          fontFamily: 'Futura Md BT',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
          textTransform: 'capitalize'
        }}
      >
        © 2024 Safaricom PLC
      </Typography>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <Link
          href="#"
          sx={{
            color: 'var(--Text-Secondary, #6B6B6B)',
            fontFamily: 'Futura Md BT',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            textTransform: 'capitalize',
            textDecoration: 'none'
          }}
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          sx={{
            color: 'var(--Text-Secondary, #6B6B6B)',
            fontFamily: 'Futura Md BT',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            textTransform: 'capitalize',
            textDecoration: 'none'
          }}
        >
          Contact Us
        </Link>
        <Link
          href="#"
          sx={{
            color: 'var(--Text-Secondary, #6B6B6B)',
            fontFamily: 'Futura Md BT',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            textTransform: 'capitalize',
            textDecoration: 'none'
          }}
        >
          Terms & Conditions
        </Link>
        <Link
          href="#"
          sx={{
            color: 'var(--Text-Secondary, #6B6B6B)',
            fontFamily: 'Futura Md BT',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            textTransform: 'capitalize',
            textDecoration: 'none'
          }}
        >
          Help & Support
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
