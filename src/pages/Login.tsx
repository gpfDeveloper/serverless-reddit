import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link as RouterLink } from 'react-router-dom';
import { FunctionComponent, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { BankLayout } from '../components/layout/BankLayout';
import { LINK_STYLE } from '../theme/theme';
import { useAuth } from '../context/auth-context';
import SocialSignIn from '../components/social-signIn/SocialSignIn';

type FormValues = {
  username: string;
  password: string;
};

const Login: FunctionComponent = () => {
  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const loginHandler: SubmitHandler<FormValues> = async ({
    username,
    password,
  }) => {
    try {
      setLoading(true);
      await login(username, password);
      setLoading(false);
    } catch (err: any) {
      const msg = err?.message || 'Incorrect username or password.';
      setLoading(false);
      setError('username', { message: msg });
    }
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
          Log In
        </Typography>
        <Divider />

        <SocialSignIn />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ backgroundColor: '#343536', height: 1.2, flex: 1 }}></Box>
          <Typography fontWeight={700} color="text.disabled">
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
                color="secondary"
                error={Boolean(errors.username)}
                helperText={
                  errors.username &&
                  (errors.username.message || 'Please enter your name')
                }
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
                color="secondary"
                error={Boolean(errors.password)}
                helperText={errors.password && 'Please enter your password'}
                fullWidth
                label="Password"
                {...field}
              />
            )}
          />
          <Box sx={LINK_STYLE}>
            <RouterLink to="/forgot-password">Forgot password?</RouterLink>
          </Box>

          {!loading && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              color="secondary"
            >
              Log In
            </Button>
          )}
          {loading && (
            <LoadingButton loading variant="outlined" fullWidth size="large">
              Log In
            </LoadingButton>
          )}
          <Box sx={LINK_STYLE}>
            {"Don't have an account? "} &nbsp;
            <RouterLink to="/signup">Sign Up</RouterLink>
          </Box>
        </Box>
      </Paper>
    </BankLayout>
  );
};

export default Login;
