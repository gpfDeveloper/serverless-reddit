import { AppBar, Toolbar, Container } from '@mui/material';
import Logo from './Logo';
import Avatar from './Avatar';
import { FunctionComponent } from 'react';

const Nav: FunctionComponent = () => {
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Logo />
          <Avatar />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
