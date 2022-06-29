import { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Layout } from '../components/layout/Layout';
import PostItems from '../components/post/PostItems';
import { POSTS } from '../dummyData/dummyData';

const Home: FunctionComponent = () => {
  return (
    <Layout>
      <Button variant="contained" size="large" startIcon={<AddIcon />}>
        Create Post
      </Button>
      <Box sx={{ mt: 2 }}>
        <PostItems items={POSTS} />
      </Box>
    </Layout>
  );
};

export default Home;
