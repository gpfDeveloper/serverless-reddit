import { createTheme } from '@mui/material/styles';

const primaryColor = '#CD3F0B';
const primaryColorLight = '#FE4500';
const secondaryColor = '#c2c2c2';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: primaryColor,
      light: primaryColorLight,
    },
    secondary: {
      main: secondaryColor,
    },
  },
  typography: {
    fontFamily: [
      'IBM Plex Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 100,
        },
      },
    },
  },
});

export default theme;

export const LINK_STYLE = {
  fontSize: 14,
  '& a': {
    color: 'text.secondary',
    textDecoration: 'underline',
    fontWeight: 700,
  },
};
