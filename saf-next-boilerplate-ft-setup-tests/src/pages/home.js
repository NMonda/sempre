import React, { useState } from 'react';
import { Box, Tabs, Tab, Button, Menu, MenuItem, Typography } from '@mui/material';
import CardContainer from '../components/CardContainer';
import NavigationWrapper from '../components/NavigationWrapper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRouter } from 'next/router';

const HomePage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0); // State to track active tab index
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateForm = () => {
    router.push('/create-form');
  };

  const handleTabChange = (event, newIndex) => {
    setActiveTabIndex(newIndex);
  };

  return (
    <NavigationWrapper>
      <Box sx={{ padding: '24px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'stretch',
            borderBottom: '1px solid var(--safaricom-black-greys-sb-50, #F6F6F6)',
            marginBottom: '16px'
          }}
        >
          <Tabs
            value={activeTabIndex}
            onChange={handleTabChange}
            aria-label="active and drafts tabs"
            sx={{ display: 'flex', justifyContent: 'space-between', alignSelf: 'stretch' }}
          >
            <Tab label="Active Forms" />
            <Tab label="Drafts" />
          </Tabs>
          <Button
            variant="outlined"
            endIcon={<ArrowDropDownIcon />}
            onClick={handleClick}
            sx={{ marginRight: '70px' }}
          >
            Groups
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Group 1</MenuItem>
            <MenuItem onClick={handleClose}>Group 2</MenuItem>
            <MenuItem onClick={handleClose}>Group 3</MenuItem>
            <MenuItem onClick={handleClose}>Add Group</MenuItem>
          </Menu>
        </Box>
        
        {/* Conditional rendering based on active tab */}
        {activeTabIndex === 0 ? (
          <CardContainer /> // Display active forms content
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Typography variant="h5">No active drafts.</Typography>
          </Box>
        )}
      </Box>
    </NavigationWrapper>
  );
};

export default HomePage;
