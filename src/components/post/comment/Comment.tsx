import { API } from 'aws-amplify';
import { Paper, CircularProgress, Box } from '@mui/material';
import { FunctionComponent, useState, useEffect } from 'react';
import CommentInput from './CommentInput';
import CommentItems from './CommentItems';
import { createComment } from '../../../graphql/mutations';
import { listCommentsPerPost } from '../../../graphql/customerQuery';
import type {
  CreateCommentInput,
  ListCommentsPerPostQuery,
} from '../../../API';
import { useAuth } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import { CommentItemProps } from '../../../types/post';

type Props = {
  postId: string;
};

const Comment: FunctionComponent<Props> = ({ postId }) => {
  const { user } = useAuth();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [items, setItems] = useState<CommentItemProps[]>([]);
  const navigate = useNavigate();
  const [comment, setComment] = useState<string | undefined>('');
  const canSubmit = Boolean(comment && comment.trim().length > 0);
  const submitHandler = async () => {
    if (!user) navigate('/login');
    if (!canSubmit) return;
    setLoadingBtn(true);
    const input: CreateCommentInput = {
      postCommentsId: postId,
      content: comment!,
      username: user!.username,
    };
    try {
      await API.graphql({
        query: createComment,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
    } catch (err) {}
    setItems((pre) => [
      {
        content: comment!,
        createdBy: user!.username,
        createdAt: new Date().toISOString(),
      },
      ...pre,
    ]);
    setLoadingBtn(false);
    setComment('');
  };

  useEffect(() => {
    const fetchComments = async () => {
      setLoadingItems(true);
      const ret = (await API.graphql({
        query: listCommentsPerPost,
        variables: { id: postId },
        authMode: 'API_KEY',
      })) as { data: ListCommentsPerPostQuery };
      const _commentItems: CommentItemProps[] = [];
      for (const item of ret.data.getPost!.comments!.items) {
        const _item: CommentItemProps = {
          content: item!.content,
          createdAt: item!.createdAt,
          createdBy: item!.username,
        };
        _commentItems.push(_item);
      }
      _commentItems.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setItems(_commentItems);
      setLoadingItems(false);
    };
    fetchComments();
  }, [postId]);

  return (
    <Paper sx={{ padding: 2 }}>
      <CommentInput
        loading={loadingBtn}
        onSubmit={submitHandler}
        canSubmit={canSubmit}
        comment={comment}
        setComment={setComment}
      />
      {loadingItems && (
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
      {!loadingItems && <CommentItems items={items} />}
    </Paper>
  );
};

export default Comment;
