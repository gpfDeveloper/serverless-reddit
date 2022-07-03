import { useState } from 'react';
import { Box, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useAuth } from '../../context/auth-context';
import LoadingButton from '@mui/lab/LoadingButton';

type Props = {};

const SocialSignIn = (props: Props) => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const { loginWithFacebook, loginWithGoogle } = useAuth();
  const loginGoogleHandler = async () => {
    setLoadingGoogle(true);
    await loginWithGoogle();
    setLoadingGoogle(false);
  };
  const loginFacebookHandler = async () => {
    setLoadingFacebook(true);
    await loginWithFacebook();
    setLoadingFacebook(false);
  };
  let googleBtn = (
    <Button
      onClick={loginGoogleHandler}
      variant="contained"
      fullWidth
      size="large"
      startIcon={<GoogleIcon />}
    >
      Continue with Google
    </Button>
  );
  if (loadingGoogle) {
    googleBtn = (
      <LoadingButton variant="contained" size="large" fullWidth loading>
        Continue with Google
      </LoadingButton>
    );
  }
  let facebookBtn = (
    <Button
      onClick={loginFacebookHandler}
      variant="contained"
      fullWidth
      size="large"
      startIcon={<FacebookIcon />}
    >
      Continue with Facebook
    </Button>
  );
  if (loadingFacebook) {
    facebookBtn = (
      <LoadingButton variant="contained" size="large" fullWidth loading>
        Continue with Facebook
      </LoadingButton>
    );
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {googleBtn}
      {facebookBtn}
    </Box>
  );
};

export default SocialSignIn;
