import { Box, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { CommentItemProps } from '../../../types/post';
import MDEditor from '@uiw/react-md-editor';
import ReactTimeAgo from 'react-time-ago';

const CommentItem: FunctionComponent<CommentItemProps> = ({
  createdAt,
  createdBy,
  content,
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 0.4, alignItems: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          {createdBy}
        </Typography>
        <Typography color="#818384">·</Typography>
        <Typography variant="caption" color="text.disabled">
          <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 0.4,
        }}
      >
        <MDEditor.Markdown source={content} />
      </Box>
    </Box>
  );
};

export default CommentItem;
