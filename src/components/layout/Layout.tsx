import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { FunctionComponent, ReactNode } from 'react';
import Nav from '../nav/Nav';

import { createTheme } from '@mui/material/styles';

const primaryColor = '#CD3F0B';
const primaryColorLight = '#FE4500';
const secondaryColor = '#c2c2c2';

export const theme = createTheme({
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

interface Props {
  children: ReactNode;
}

export const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Nav />
      <Box
        sx={{ maxWidth: 640, margin: '2rem auto', mt: 10, padding: { xs: 1 } }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};
