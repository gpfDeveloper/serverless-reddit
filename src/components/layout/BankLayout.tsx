import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { FunctionComponent, ReactNode } from 'react';
import Logo from '../nav/Logo';
import { theme } from './Layout';

interface Props {
  children: ReactNode;
}

export const BankLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Logo />
        {children}
      </Box>
    </ThemeProvider>
  );
};
