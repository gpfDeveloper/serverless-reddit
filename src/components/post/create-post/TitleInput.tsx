import { Box, TextField, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const TitleInput: FunctionComponent<Props> = ({ title, setTitle }) => {
  return (
    <Box sx={{ position: 'relative', padding: 0, margin: 0 }}>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        InputProps={{ style: { paddingRight: '60px' } }}
        multiline
        error={title.length > 300}
        variant="outlined"
        placeholder="Title"
        fullWidth
        color="secondary"
        size="small"
      />
      <Typography
        sx={{ position: 'absolute', right: 12, bottom: 8 }}
        variant="caption"
        color="text.secondary"
      >
        {title.length} / 300
      </Typography>
    </Box>
  );
};

export default TitleInput;
