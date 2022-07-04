import { FunctionComponent } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type Props = {
  onSubmit: () => void;
  canSubmit: boolean;
  loading: boolean;
  comment: string | undefined;
  setComment: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const CommentInput: FunctionComponent<Props> = ({
  onSubmit,
  canSubmit,
  comment,
  loading,
  setComment,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <MDEditor
        textareaProps={{ placeholder: 'What are your thoughts?' }}
        value={comment}
        onChange={setComment}
      />
      {!loading && (
        <Button
          onClick={onSubmit}
          color="secondary"
          sx={{
            alignSelf: 'flex-end',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
          }}
          variant="contained"
        >
          Comment
        </Button>
      )}
      {loading && (
        <LoadingButton
          variant="contained"
          loading
          sx={{ alignSelf: 'flex-end' }}
        >
          Comment
        </LoadingButton>
      )}
    </Box>
  );
};

export default CommentInput;
