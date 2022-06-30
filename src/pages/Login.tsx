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

export const LINK_STYLE = {
  fontSize: 14,
  '& a': {
    color: 'text.secondary',
    textDecoration: 'underline',
    fontWeight: 700,
  },
};

const Login: FunctionComponent = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const loginHandler = () => {};
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
          Log In
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
              variant="contained"
              fullWidth
              size="large"
              startIcon={<GoogleIcon />}
            >
              Continue with Google
            </Button>
            <Button
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
          <Typography variant="h6" color="text.disabled">
            OR
          </Typography>
          <Box sx={{ backgroundColor: '#343536', height: 1.2, flex: 1 }}></Box>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(loginHandler)}
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
                error={Boolean(errors.username)}
                helperText={errors.username && 'Please enter your name'}
                fullWidth
                label="User Name"
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                type="password"
                error={Boolean(errors.password)}
                helperText={errors.password && 'Please enter your password'}
                fullWidth
                label="Password"
                {...field}
              />
            )}
          />
          <Box sx={LINK_STYLE}>
            <RouterLink to="/forgot_password">Forgot password?</RouterLink>
          </Box>

          <Button type="submit" fullWidth variant="outlined" size="large">
            Log In
          </Button>
          <Box sx={LINK_STYLE}>
            {"Don't have an account? "}
            <RouterLink to="/register">Sign Up</RouterLink>
          </Box>
        </Box>
      </Paper>
    </BankLayout>
  );
};

export default Login;
