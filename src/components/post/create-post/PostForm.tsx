import { Box, TextField } from '@mui/material';
import { FunctionComponent } from 'react';

const PostForm: FunctionComponent = () => {
  return (
    <Box sx={{ padding: 2, mt: 1 }}>
      <TextField
        variant="outlined"
        placeholder="Title"
        fullWidth
        color="secondary"
        size="small"
      />
    </Box>
  );
};

export default PostForm;
