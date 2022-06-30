import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { FunctionComponent, ReactNode } from 'react';
import Nav from '../nav/Nav';

import theme from '../../theme/theme';

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
