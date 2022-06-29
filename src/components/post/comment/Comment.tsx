import { Paper } from '@mui/material';
import { FunctionComponent } from 'react';
import CommentInput from './CommentInput';
import { COMMENTS } from '../../../dummyData/dummyData';
import CommentItems from './CommentItems';

const Comment: FunctionComponent = () => {
  return (
    <Paper sx={{ padding: 2 }}>
      <CommentInput />
      <CommentItems items={COMMENTS} />
    </Paper>
  );
};

export default Comment;
