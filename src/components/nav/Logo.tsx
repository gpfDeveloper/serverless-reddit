import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import RedditIcon from '@mui/icons-material/Reddit';

const Logo: FunctionComponent = () => {
  return (
    <Link to="/">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            padding: '6.4px',
            borderRadius: '50%',
            backgroundColor: 'primary.light',
            mr: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RedditIcon sx={{ color: 'white' }} />
        </Box>
        <Typography
          variant="h5"
          noWrap
          sx={{
            mr: 2,
            fontFamily: '"Oswald", sans-serif;',
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Serverless Reddit
        </Typography>
      </Box>
    </Link>
  );
};

export default Logo;
