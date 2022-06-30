import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  TextField,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { FunctionComponent } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Controller, useForm } from 'react-hook-form';
import { BankLayout } from '../components/layout/BankLayout';
import { LINK_STYLE } from '../theme/theme';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

const Signup: FunctionComponent = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const signupHandler = () => {
    navigate('/signup-confirm');
  };
  const signupGoogleHandler = () => {
    login();
  };
  const signupFacebookHandler = () => {
    login();
  };
  return (
    <BankLayout>
      <Paper
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: { xs: '100%', sm: 600 },
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Sign Up
        </Typography>
        <Divider />
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Button
              onClick={signupGoogleHandler}
              variant="contained"
              fullWidth
              size="large"
              startIcon={<GoogleIcon />}
            >
              Continue with Google
            </Button>
            <Button
              onClick={signupFacebookHandler}
              variant="contained"
              fullWidth
              size="large"
              startIcon={<FacebookIcon />}
            >
              Continue with Facebook
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ backgroundColor: '#343536', height: 1.2, flex: 1 }}></Box>
          <Typography fontWeight={700} color="text.disabled">
            OR
          </Typography>
          <Box sx={{ backgroundColor: '#343536', height: 1.2, flex: 1 }}></Box>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(signupHandler)}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Controller
            name="username"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                color="secondary"
                error={Boolean(errors.username)}
                helperText={errors.username && 'Please enter your name'}
                fullWidth
                label="User Name"
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                type="email"
                color="secondary"
                error={Boolean(errors.email)}
                helperText={errors.email && 'Please enter your email'}
                fullWidth
                label="Email Address"
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            defaultValue=""
            control={control}
            rules={{ required: true, minLength: 6 }}
            render={({ field }) => (
              <TextField
                type="password"
                color="secondary"
                error={Boolean(errors.password)}
                helperText={
                  errors.password && 'Password should more than 6 charactor'
                }
                fullWidth
                label="Password"
                {...field}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            color="secondary"
          >
            Sign Up
          </Button>
          <Box sx={LINK_STYLE}>
            {'Aready have an account?'} &nbsp;
            <RouterLink to="/login">Log In</RouterLink>
          </Box>
        </Box>
      </Paper>
    </BankLayout>
  );
};

export default Signup;