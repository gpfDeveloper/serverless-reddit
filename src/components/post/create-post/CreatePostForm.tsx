import { styled } from '@mui/material/styles';
import {
  Paper,
  Tabs as MUITabs,
  Tab as MUITab,
  Box,
  Button,
} from '@mui/material';
import type { TabProps, TabsProps } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import PostTab from './PostTab';

const Tabs = styled((props: TabsProps) => <MUITabs {...props} />)({
  border: '1px solid #343536',
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#D7DADC',
  },
});

const Tab = styled((props: TabProps) => <MUITab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(15),
    borderRight: 1,
    borderBottom: 1,
    borderColor: '#343536',
    borderRightStyle: 'solid',
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: 'rgba(255,255,255,0.9)',
      backgroundColor: 'rgba(255,255,255,.06)',
    },
  })
);

const CreatePostForm: FunctionComponent = () => {
  const [tab, setTab] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | undefined>('');

  let canSubmit = false;
  if (title.length > 1 && title.length < 301) {
    canSubmit = true;
  }

  const submitHandler = () => {
    if (!canSubmit) return;
    console.log(title);
    console.log(content);
  };
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab
          icon={<ArticleIcon />}
          iconPosition="start"
          label="Post"
          color="secondary.main"
          sx={{ color: 'secondary.main' }}
        />
        <Tab icon={<ImageIcon />} iconPosition="start" label="Images" />
      </Tabs>
      <Box sx={{ padding: 2, mt: 1 }}>
        {tab === 0 && (
          <PostTab
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
          />
        )}
      </Box>
      <Box sx={{ alignSelf: 'flex-end', mr: 2, mb: 2 }}>
        <Button
          onClick={submitHandler}
          variant="contained"
          color="secondary"
          sx={{ cursor: canSubmit ? 'pointer' : 'not-allowed' }}
        >
          Post
        </Button>
      </Box>
    </Paper>
  );
};

export default CreatePostForm;
