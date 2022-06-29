import { Typography, Box, Divider } from '@mui/material';
import { FunctionComponent } from 'react';
import { Layout } from '../components/layout/Layout';
import CreatePostForm from '../components/post/create-post/CreatePostForm';

const CreatePost: FunctionComponent = () => {
  return (
    <Layout>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5">Create a post</Typography>
        <Divider />
        <CreatePostForm />
      </Box>
    </Layout>
  );
};

export default CreatePost;
