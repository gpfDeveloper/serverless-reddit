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
  const [canDrop, setCanDrop] = useState(false);

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
    if (e.type === 'dragover') {
      setCanDrop(true);
    }
    if (e.type === 'dragleave') {
      setCanDrop(false);
    }
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
    setCanDrop(false);
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
            borderStyle: 'dashed',
            borderWidth: canDrop ? '3px' : '1px',
            borderColor: canDrop ? 'grey.400' : 'grey.800',
          }}
          onDragEnter={dragHandler}
          onDragOver={dragHandler}
          onDragLeave={dragHandler}
          onDrop={dropHandler}
        >
          {!canDrop && (
            <>
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
            </>
          )}
          {canDrop && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ height: 100, width: 100 }}>
                <img src="/hamster.png" alt="hamster" />
              </Box>
              <Typography variant="h6">Drop here to upload</Typography>
            </Box>
          )}
        </Box>
      )}
      {img && (
        <>
          <img src={previewUrl} alt="preview" />
          <IconButton
            onClick={removeImgHandler}
            sx={{ position: 'absolute', top: -20, right: -20 }}
          >
            <CancelIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default ImgUpload;
