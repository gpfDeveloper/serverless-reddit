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
import { useAuth } from '../context/auth-context';

const SignupConfirm: FunctionComponent = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const { login } = useAuth();
  const confirmSignupHandler = () => {
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
          Confirm your account
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
            name="code"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                color="secondary"
                error={Boolean(errors.code)}
                helperText={errors.code && 'Please enter confirmation code'}
                fullWidth
                label="Confirmation Code"
                {...field}
              />
            )}
          />

          <Button type="submit" fullWidth variant="contained" size="large">
            Confirm Sign Up
          </Button>
          <Box sx={LINK_STYLE}>
            <RouterLink to="/signup">Cancel</RouterLink>
          </Box>
        </Box>
      </Paper>
    </BankLayout>
  );
};

export default SignupConfirm;
