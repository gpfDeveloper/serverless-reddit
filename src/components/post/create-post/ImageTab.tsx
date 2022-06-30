import { Box } from '@mui/material';
import { FunctionComponent } from 'react';
import ImgUpload from './ImgUpload';
import TitleInput from './TitleInput';

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  img: File | undefined;
  setImg: React.Dispatch<React.SetStateAction<File | undefined>>;
};

const ImageTab: FunctionComponent<Props> = ({
  title,
  setTitle,
  img,
  setImg,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TitleInput title={title} setTitle={setTitle} />
      <ImgUpload img={img} setImg={setImg} />
    </Box>
  );
};

export default ImageTab;
