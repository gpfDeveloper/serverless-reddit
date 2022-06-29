import { Box } from '@mui/material';
import { FunctionComponent } from 'react';
import { PostItemProps } from '../../types/post';
import PostItem from './PostItem';

type Props = {
  items: PostItemProps[];
};

const PostItems: FunctionComponent<Props> = ({ items }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {items.map((item) => (
        <PostItem key={item.id} {...item} />
      ))}
    </Box>
  );
};

export default PostItems;
