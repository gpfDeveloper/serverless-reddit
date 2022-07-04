import { API, Storage } from 'aws-amplify';
import { FunctionComponent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import PostItem from '../components/post/PostItem';
import { PostItemProps } from '../types/post';
import Comment from '../components/post/comment/Comment';
import { Box, CircularProgress } from '@mui/material';
import { getPost } from '../graphql/queries';
import { GetPostQuery } from '../API';

const PostDetail: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [postItem, setPostItem] = useState<PostItemProps | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const ret = (await API.graphql({
        query: getPost,
        variables: { id },
        authMode: 'API_KEY',
      })) as { data: GetPostQuery };

      const post = ret.data!.getPost;
      const _postItem: PostItemProps = {
        id: post!.id,
        title: post!.title,
        votes: post!.votes!.items,
        createdBy: post!.username,
        createdAt: post!.createdAt,
        content: post!.content || '',
        comments: post!.comments!.items,
      };
      if (post!.image) {
        _postItem.img = await Storage.get(post!.image);
      }

      setPostItem(_postItem);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  return (
    <Layout>
      {!loading && postItem && (
        <>
          <PostItem {...postItem} isDetail={true} />
          <Box sx={{ mt: 1 }}>
            <Comment />
          </Box>
        </>
      )}
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
    </Layout>
  );
};

export default PostDetail;
