import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { POSTS } from '../dummyData/dummyData';
import PostItem from '../components/post/PostItem';
import { PostItemProps } from '../types/post';
import Comment from '../components/post/comment/Comment';
import { Box } from '@mui/material';

const PostDetail: FunctionComponent = () => {
  const params = useParams();
  const { id } = params;
  const post = POSTS.find((item) => item.id === id) as PostItemProps;
  return (
    <Layout>
      <PostItem {...post} isDetail={true} />
      <Box sx={{ mt: 1 }}>
        <Comment />
      </Box>
    </Layout>
  );
};

export default PostDetail;
