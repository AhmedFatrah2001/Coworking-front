import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#191D88',
      light: '#1450A3',
      dark: '#337CCF',
    },
    secondary: {
      main: '#FFC436',
    },
    background: {
      default: '#EEF7FF',
      paper: '#FFFFFF',
    }
  },
  typography: {
    fontFamily: 'Open Sans, Arial, sans-serif',
    button: {
      textTransform: 'none'
    }
  },
});

export default theme;
