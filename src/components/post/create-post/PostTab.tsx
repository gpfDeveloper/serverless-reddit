import { Box } from '@mui/material';
import { FunctionComponent } from 'react';
import MDEditor from '@uiw/react-md-editor';
import TitleInput from './TitleInput';

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string | undefined;
  setContent: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const PostTab: FunctionComponent<Props> = ({
  title,
  setTitle,
  content,
  setContent,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TitleInput title={title} setTitle={setTitle} />
      <MDEditor
        textareaProps={{ placeholder: 'Text (optional)' }}
        value={content}
        onChange={(v) => setContent(v)}
      />
    </Box>
  );
};

export default PostTab;
