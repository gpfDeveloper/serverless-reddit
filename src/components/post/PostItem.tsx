import MDEditor from '@uiw/react-md-editor';
import { Box, Card, IconButton, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { PostItemProps } from '../../types/post';
import ReactTimeAgo from 'react-time-ago';
import { FunctionComponent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = PostItemProps & { isDetail?: boolean };

const PostItem: FunctionComponent<Props> = ({
  id,
  vote,
  createdBy,
  createdAt,
  title,
  content,
  numOfComments,
  img,
  isDetail = false,
}) => {
  let _vote;
  if (vote === 0) {
    _vote = 'Vote';
  } else {
    _vote = vote.toString();
  }
  const navigate = useNavigate();
  const hover = isDetail
    ? {}
    : { borderWidth: 1, borderStyle: 'solid', borderColor: 'text.disabled' };

  const onClickCard = () => {
    if (isDetail) return;
    navigate(`/post/${id}`);
  };

  const onUpVote = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };
  const onDownVote = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={onUpVote}>
          <ArrowDropUpIcon fontSize="large" sx={{ color: 'text.secondary' }} />
        </IconButton>
        <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{_vote}</Typography>
        <IconButton onClick={onDownVote}>
          <ArrowDropDownIcon
            fontSize="large"
            sx={{ color: 'text.secondary' }}
          />
        </IconButton>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="caption" color="text.disabled">
          Posted by {createdBy}{' '}
          <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
        </Typography>
        <Typography variant="h5">{title}</Typography>
        {img ? (
          <Box sx={{ maxWidth: 600, height: isDetail ? '100%' : 420 }}>
            <img src={img} alt={title} />
          </Box>
        ) : (
          <Box color="text.secondary">
            {isDetail ? (
              <MDEditor.Markdown source={content} />
            ) : (
              <MDEditor.Markdown source={content.substring(0, 200)} />
            )}
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box
            sx={{
              display: { xs: 'flex', lg: 'none' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <IconButton onClick={onUpVote} sx={{ padding: 0 }}>
              <ArrowDropUpIcon
                fontSize="large"
                sx={{ color: 'text.secondary' }}
              />
            </IconButton>
            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
              {_vote}
            </Typography>
            <IconButton onClick={onDownVote} sx={{ padding: 0 }}>
              <ArrowDropDownIcon
                fontSize="large"
                sx={{ color: 'text.secondary' }}
              />
            </IconButton>
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
                {numOfComments} Comments
              </Typography>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PostItem;
