import { Box } from '@mui/material';
import { FunctionComponent } from 'react';
import ImgUpload from './ImgUpload';
import TitleInput from './TitleInput';

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const ImageTab: FunctionComponent<Props> = ({ title, setTitle }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TitleInput title={title} setTitle={setTitle} />
      <ImgUpload img="" />
    </Box>
  );
};

export default ImageTab;
