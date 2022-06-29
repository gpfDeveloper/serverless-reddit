import { styled } from '@mui/material/styles';
import { Paper, Tabs as MUITabs, Tab as MUITab } from '@mui/material';
import type { TabProps, TabsProps } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import PostForm from './PostForm';

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
  return (
    <Paper>
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
      {tab === 0 && <PostForm />}
    </Paper>
  );
};

export default CreatePostForm;
