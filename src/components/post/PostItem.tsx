import MDEditor from '@uiw/react-md-editor';
import { Box, Card, IconButton, Typography } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { PostItemProps } from '../../types/post';
import ReactTimeAgo from 'react-time-ago';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import Vote from './vote/Vote';

type Props = PostItemProps & { isDetail?: boolean };

const PostItem: FunctionComponent<Props> = ({
  id,
  createdBy,
  createdAt,
  title,
  content,
  comments,
  img,
  votes,
  isDetail = false,
}) => {
  const navigate = useNavigate();
  const hover = isDetail
    ? {}
    : { borderWidth: 1, borderStyle: 'solid', borderColor: 'text.disabled' };

  const onClickCard = () => {
    if (isDetail) return;
    navigate(`/post/${id}`);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        padding: 2,
        pl: 1,
        gap: 1,
        pb: 0,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'transparent',
        cursor: isDetail ? 'default' : 'pointer',
        '&:hover': hover,
      }}
      onClick={onClickCard}
    >
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Vote postId={id} />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="caption" color="text.disabled">
          Posted by {createdBy}{' '}
          <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
        </Typography>
        <Typography variant="h5">{title}</Typography>
        {img ? (
          <>
            <Box sx={{ maxWidth: 600, height: isDetail ? '100%' : 420 }}>
              <img src={img} alt={title} />
            </Box>
            {isDetail && content && (
              <Box color="text.secondary">
                <MDEditor.Markdown source={content} />
              </Box>
            )}
          </>
        ) : (
          content && (
            <Box color="text.secondary">
              {isDetail ? (
                <MDEditor.Markdown source={content} />
              ) : (
                <MDEditor.Markdown source={content.substring(0, 200)} />
              )}
            </Box>
          )
        )}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Vote postId={id} />
          </Box>
          <Box>
            <IconButton
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 4,
                gap: 1,
              }}
              disabled={isDetail}
            >
              <ChatBubbleOutlineIcon sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" color="text.disabled">
                {comments?.length} Comments
              </Typography>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PostItem;
