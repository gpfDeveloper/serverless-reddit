import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Logo from './Logo';
import Avatar from './Avatar';
import { FunctionComponent } from 'react';
import { useAuth } from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';

const Nav: FunctionComponent = () => {
  const theme = useTheme();
  const isBelowSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuth();
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate('/login');
  };
  const signupHandler = () => {
    navigate('/signup');
  };
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Logo />
          {user && <Avatar user={user} />}
          {!user && !isBelowSm && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={loginHandler}
              >
                Log In
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={signupHandler}
              >
                Sign Up
              </Button>
            </Box>
          )}
          {!user && isBelowSm && (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={loginHandler}
            >
              Log In
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
