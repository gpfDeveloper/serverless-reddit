import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  TextField,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FunctionComponent, useState, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { BankLayout } from '../components/layout/BankLayout';
import { LINK_STYLE } from '../theme/theme';
import { useAuth } from '../context/auth-context';
import { LoadingButton } from '@mui/lab';

type FormValues = {
  username: string;
  authCode: string;
  password: string;
};

const ForgotPassword: FunctionComponent = () => {
  const [isReset, setIsReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
    setValue,
  } = useForm<FormValues>();

  useEffect(() => {
    if (isReset) {
      setValue('authCode', '');
      setValue('password', '');
    }
  }, [isReset, setValue]);

  const { forgotPassword, resetPassword } = useAuth();
  const forgotPasswordHandler: SubmitHandler<FormValues> = async ({
    username,
  }) => {
    try {
      setLoading(true);
      await forgotPassword(username);
      setIsReset(true);
      setLoading(false);
    } catch (err: any) {
      const msg = 'User not found.';
      setError('username', { message: msg });
      setLoading(false);
    }
  };

  const resetPasswordHandler: SubmitHandler<FormValues> = async ({
    username,
    password,
    authCode,
  }) => {
    try {
      setLoading(true);
      await resetPassword(username, authCode, password);
      setLoading(false);
      navigate('/login');
    } catch (err: any) {
      const msg =
        err.message || 'Something went wrong, please try again later.';
      setError('authCode', { message: msg });
      setLoading(false);
    }
  };

  let content = (
    <>
      <Typography variant="h6" fontWeight={700}>
        Forgot Your Password?
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Enter your user name and we′ll send you instructions to your email to
        reset your password.
      </Typography>
      <Divider />
      <Box
        component="form"
        onSubmit={handleSubmit(forgotPasswordHandler)}
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
                (errors.username.message || 'Please enter your user name')
              }
              fullWidth
              label="User Name"
              {...field}
            />
          )}
        />
        {!loading && (
          <Button type="submit" fullWidth variant="contained" size="large">
            Continue
          </Button>
        )}
        {loading && (
          <LoadingButton loading variant="outlined" fullWidth size="large">
            Continue
          </LoadingButton>
        )}
        <Box sx={LINK_STYLE}>
          <RouterLink to="/login">Back to login</RouterLink>
        </Box>
      </Box>
    </>
  );

  if (isReset) {
    content = (
      <>
        <Typography variant="h6" fontWeight={700}>
          Reset your password
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please check your email for the confirmation code.
        </Typography>
        <Divider />
        <Box
          component="form"
          onSubmit={handleSubmit(resetPasswordHandler)}
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
            <Button type="submit" fullWidth variant="contained" size="large">
              Reset Password
            </Button>
          )}
          {loading && (
            <LoadingButton loading variant="outlined" fullWidth size="large">
              Reset Password
            </LoadingButton>
          )}
          <Button
            color="secondary"
            sx={{ alignSelf: 'flex-start' }}
            onClick={() => setIsReset(false)}
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

export default ForgotPassword;
