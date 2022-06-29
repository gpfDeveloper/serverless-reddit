import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Box, Button } from '@mui/material';

type Props = {};

const CommentInput = (props: Props) => {
  const [value, setValue] = useState<string | undefined>('');
  const onSubmit = () => {
    console.log(value);
    setValue('');
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <MDEditor
        textareaProps={{ placeholder: 'What are your thoughts?' }}
        value={value}
        onChange={setValue}
      />
      <Button
        onClick={onSubmit}
        color="secondary"
        sx={{ alignSelf: 'flex-end' }}
        variant="contained"
      >
        Comment
      </Button>
    </Box>
  );
};

export default CommentInput;
