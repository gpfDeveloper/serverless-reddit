import { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import React, { FunctionComponent } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
  img: File | undefined;
  setImg: React.Dispatch<React.SetStateAction<File | undefined>>;
};

const ImgUpload: FunctionComponent<Props> = ({ img, setImg }) => {
  const [previewUrl, setPreviewUrl] = useState('');

  const createPreview = (files: FileList) => {
    const img = files[0];
    setImg(img);
    const objectUrl = URL.createObjectURL(img);
    setPreviewUrl(objectUrl);
  };
  const previewHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    createPreview(files);
  };

  const dragHandler = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dropHandler = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (!files) return;
    createPreview(files);
  };

  const removeImgHandler = () => {
    setImg(undefined);
    setPreviewUrl('');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {!img && (
        <Box
          sx={{
            minHeight: 280,
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px dashed #343536',
          }}
          onDragEnter={dragHandler}
          onDragOver={dragHandler}
          onDrop={dropHandler}
        >
          <Typography color="text.secondary" variant="h6">
            Drag and drop image or
          </Typography>
          <label htmlFor="upload-img">
            <input
              onChange={previewHandler}
              id="upload-img"
              accept="image/*"
              style={{ display: 'none' }}
              type="file"
            />
            <Button
              component="span"
              variant="outlined"
              size="large"
              color="secondary"
            >
              Upload
            </Button>
          </label>
        </Box>
      )}
      {img && (
        <>
          <img src={previewUrl} alt="preview" />
          <IconButton
            onClick={removeImgHandler}
            sx={{ position: 'absolute', top: 0, right: 0 }}
          >
            <CancelIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default ImgUpload;
