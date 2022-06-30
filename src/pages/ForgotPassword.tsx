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
import { Controller, useForm } from 'react-hook-form';
import { BankLayout } from '../components/layout/BankLayout';
import { LINK_STYLE } from '../theme/theme';

const ForgotPassword: FunctionComponent = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const forgotPasswordHandler = () => {};

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
          Forgot Your Password?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your email and we′ll send you instructions to reset your
          password.
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
            name="email"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                color="secondary"
                type="email"
                error={Boolean(errors.email)}
                helperText={errors.email && 'Please enter your email'}
                fullWidth
                label="Email Address"
                {...field}
              />
            )}
          />

          <Button type="submit" fullWidth variant="contained" size="large">
            Continue
          </Button>
          <Box sx={LINK_STYLE}>
            <RouterLink to="/login">Back to login</RouterLink>
          </Box>
        </Box>
      </Paper>
    </BankLayout>
  );
};

export default ForgotPassword;
