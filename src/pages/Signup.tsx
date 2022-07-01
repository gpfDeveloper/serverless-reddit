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
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { BankLayout } from '../components/layout/BankLayout';
import { LINK_STYLE } from '../theme/theme';
import { useAuth } from '../context/auth-context';

type FormValues = {
  username: string;
  email: string;
  password: string;
  authCode: string;
};

const Signup: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const { signUp, confirmSignUp } = useAuth();
  const {
    formState: { errors },
    handleSubmit,
    control,
    setError,
  } = useForm<FormValues>();
  const signupHandler: SubmitHandler<FormValues> = async ({
    username,
    password,
    email,
  }) => {
    try {
      setLoading(true);
      await signUp(username, email, password);
      setIsConfirm(true);
      setLoading(false);
    } catch (err: any) {
      const msg =
        err?.message || 'Something goes wrong, please try again later.';
      setLoading(false);
      setError('username', { message: msg });
    }
  };
  const confirmSignupHandler: SubmitHandler<FormValues> = async ({
    username,
    email,
    password,
    authCode,
  }) => {
    try {
      setLoading(true);
      await confirmSignUp(username, authCode, password);
      setLoading(false);
    } catch (err: any) {
      const msg =
        err?.message || 'Something goes wrong, please try again later.';
      setLoading(false);
      setError('authCode', { message: msg });
    }
  };
  const signupGoogleHandler = () => {
    // login();
  };
  const signupFacebookHandler = () => {
    // login();
  };

  let content = (
    <>
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
          rules={{ required: true, minLength: 8 }}
          render={({ field }) => (
            <TextField
              type="password"
              color="secondary"
              error={Boolean(errors.password)}
              helperText={
                errors.password && 'Password should more than 8 charactor'
              }
              fullWidth
              label="Password"
              {...field}
            />
          )}
        />

        {!loading && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            color="secondary"
          >
            Sign Up
          </Button>
        )}
        {loading && (
          <LoadingButton loading variant="outlined" fullWidth size="large">
            Sign In
          </LoadingButton>
        )}
        <Box sx={LINK_STYLE}>
          {'Aready have an account?'} &nbsp;
          <RouterLink to="/login">Log In</RouterLink>
        </Box>
      </Box>
    </>
  );

  if (isConfirm) {
    content = (
      <>
        <Typography variant="h6" fontWeight={700}>
          Confirm your account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please check your email for the confirmation code.
        </Typography>
        <Divider />

        <Box
          component="form"
          onSubmit={handleSubmit(confirmSignupHandler)}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Controller
            name="authCode"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                color="secondary"
                error={Boolean(errors.authCode)}
                helperText={
                  errors.authCode &&
                  (errors.authCode.message || 'Please enter confirmation code')
                }
                fullWidth
                label="Confirmation Code"
                {...field}
              />
            )}
          />

          {!loading && (
            <Button type="submit" fullWidth variant="contained" size="large">
              Sign Up
            </Button>
          )}
          {loading && (
            <LoadingButton loading variant="outlined" fullWidth size="large">
              Sign Up
            </LoadingButton>
          )}
          <Button
            color="secondary"
            sx={{ alignSelf: 'flex-start' }}
            onClick={() => setIsConfirm(false)}
          >
            Back
          </Button>
        </Box>
      </>
    );
  }

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
        {content}
      </Paper>
    </BankLayout>
  );
};

export default Signup;
