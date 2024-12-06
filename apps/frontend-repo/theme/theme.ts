// theme/theme.ts
import { createTheme } from '@mui/material/styles';

// Define the theme object
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#dc004e', // Pink
    },
    error: {
      main: '#f44336', // Red
    },
    background: {
      default: '#f5f5f5', // Light grey
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none', // Disable uppercase on buttons
    },
  },
  spacing: 8, // Default spacing factor
});

export default theme;
