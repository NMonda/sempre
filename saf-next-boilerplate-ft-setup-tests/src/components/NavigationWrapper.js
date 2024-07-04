import React from 'react';
import { AppBar, Box, Toolbar, Button, IconButton, Container, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Footer from './Footer';
import theme from '../theme'; // 

const NavigationWrapper = ({ children }) => {
  const router = useRouter();

  const handleCreateForm = () => {
    router.push('/create-form');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', 
      color: '#000000',
      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)' 
       }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Image src="/Layer_1.png" alt="Logo" width={140} height={31.36} />

          <Box 
            sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              marginX: '24px' 
              
            }}
          >
            <Box 
              sx={{ 
                position: 'relative', 
                borderRadius: '24px', 
                backgroundColor: '#f0f0f0', 
                width: '482px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #CCC'
              }}
            >
              <Box sx={{ position: 'absolute', height: '100%', display: 'flex', alignItems: 'center', paddingLeft: 2 }}>
                <SearchIcon />
              </Box>
              <InputBase
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
              
                sx={{ 
                  width: '100%', 
                  paddingLeft: 6, 
                  color: theme.typography?.body2?.color || '#000', 
                  fontFamily: theme.typography?.fontFamily || 'Arial, sans-serif', 
                  fontSize: theme.typography?.body2?.fontSize || '12px', 
                  fontWeight: theme.typography?.body2?.fontWeight || 400,
                  fontStyle: 'normal',
                  lineHeight: theme.typography?.body2?.lineHeight || 'normal'
                }}
              />
              
            </Box>
          </Box>

          <Button 
            color="inherit" 
            startIcon={<AddCircleOutlineIcon />} 
            onClick={handleCreateForm}
            sx={{ 
              display: 'flex',
              padding: 'var(--Padding-Vertical-Large, 12px) var(--Padding-Horizontal-Large, 24px)',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '50px',
              background: 'var(--Color-Contained-Default-BG, #1E8838)', 
              color: 'var(--Color-Contained-Default-Label, #FFF)', 
              fontFamily: 'Futura',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '24px',
              letterSpacing: '-0.28px'
            }}
          >
            Create a Form
          </Button>
          <IconButton color="inherit" sx={{ width: '30px', height: '30px', flexShrink: 0, marginLeft: '20px' }}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ padding: '24px', minHeight: '100vh' }}>
        {children}
      </Container>
      <Footer /> 
    </Box>
  );
};

export default NavigationWrapper;
