import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, Storage } from 'aws-amplify';
import type { ListPostsQuery } from '../API';
import { Box, Button, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Layout } from '../components/layout/Layout';
import PostItems from '../components/post/PostItems';
import type { PostItemProps } from '../types/post';
import { listPosts } from '../graphql/queries';

const Home: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [postItems, setPostItems] = useState<PostItemProps[]>([]);
  const navigate = useNavigate();
  const createPostHandler = () => {
    navigate('/create-post');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let _postItems: PostItemProps[] = [];
      const ret = (await API.graphql({
        query: listPosts,
        authMode: 'API_KEY',
      })) as { data: ListPostsQuery };
      for (const post of ret.data.listPosts!.items) {
        const vote = post!.votes!.items.reduce(
          (pre, cur) => pre + cur!.vote,
          0
        );
        const postItem: PostItemProps = {
          id: post!.id,
          title: post!.title,
          vote,
          createdBy: post!.username,
          createdAt: post!.createdAt,
          content: post!.content || '',
          numOfComments: post!.comments!.items.length,
        };
        if (post!.image) {
          postItem.img = await Storage.get(post!.image);
        }
        _postItems.push(postItem);
      }
      setPostItems(_postItems);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <Layout>
      <Button
        onClick={createPostHandler}
        variant="contained"
        size="large"
        startIcon={<AddIcon />}
      >
        Create Post
      </Button>
      <Box sx={{ mt: 2 }}>
        {!loading && <PostItems items={postItems} />}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Home;
