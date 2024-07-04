import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Futura Md BT, Arial, sans-serif',
    h6: {
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: '20px',
      color: 'var(--safaricom-black-greys-sb-900, #313131)',
      fontFeatureSettings: "'clig' off, 'liga' off",
    },
    body2: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '20px',
      color: 'var(--safaricom-black-greys-sb-600, #515151)',
      fontFeatureSettings: "'clig' off, 'liga' off",
      fontFamily: 'Futura Lt BT, Arial, sans-serif',
    },
  },
});

export default theme;
