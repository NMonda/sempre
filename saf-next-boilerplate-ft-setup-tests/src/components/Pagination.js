import React from 'react';
import { Box, Pagination } from '@mui/material';

const CustomPagination = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '10px', 
        borderRadius: '2px', 
       
        background: 'var(--Neutral-1, #FFF)',
        gap: '10px',
        marginTop: '20px' // Add space above the pagination for better layout
      }}
    >
      <Pagination 
        count={4} 
        variant="outlined" 
        shape="rounded" 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '10px', 
          borderRadius: '2px', 
          background: 'var(--Neutral-1, #FFF)',
          gap: '10px',
          '& .MuiPaginationItem-root': {
            width: '30px',
            height: '30px',
            flexShrink: 0
          }
        }}
      />
    </Box>
  );
};

export default CustomPagination;
