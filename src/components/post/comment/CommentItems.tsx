import { Box } from '@mui/material';
import { FunctionComponent } from 'react';
import { CommentItemProps } from '../../../types/post';
import CommentItem from './CommentItem';

type Props = {
  items: CommentItemProps[];
};

const CommentItems: FunctionComponent<Props> = ({ items }) => {
  return (
    <Box sx={{ display: 'flex', mt: 4, flexDirection: 'column', gap: 4 }}>
      {items.map((item) => (
        <CommentItem key={item.createdAt} {...item} />
      ))}
    </Box>
  );
};

export default CommentItems;
