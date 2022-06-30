import { Box, Typography, Button } from '@mui/material';
import { FunctionComponent } from 'react';

type Props = {
  img: string;
  // setImg: React.Dispatch<React.SetStateAction<string>>;
};

const ImgUpload: FunctionComponent<Props> = ({ img }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!img && (
        <Box
          sx={{
            minHeight: 280,
            width: '100%',
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px dashed #343536',
          }}
        >
          <Typography color="text.secondary" variant="h6">
            Drag and drop image or
          </Typography>
          <Button variant="outlined" size="large" color="secondary">
            Upload
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ImgUpload;
