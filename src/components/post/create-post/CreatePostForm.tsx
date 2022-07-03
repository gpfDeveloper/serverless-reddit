import { v4 as uuid } from 'uuid';
import { API, Storage } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { useNavigate } from 'react-router-dom';
import { CreatePostMutation } from '../../../API';
import { createPost } from '../../../graphql/mutations';
import { styled } from '@mui/material/styles';
import {
  Paper,
  Tabs as MUITabs,
  Tab as MUITab,
  Box,
  Button,
  Divider,
} from '@mui/material';
import type { TabProps, TabsProps } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FunctionComponent, useState } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import PostTab from './PostTab';
import ImageTab from './ImageTab';
import { useAuth } from '../../../context/auth-context';

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
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | undefined>('');
  const [img, setImg] = useState<File | undefined>(undefined);

  const navigate = useNavigate();

  let canSubmit = false;
  if (title.length > 1 && title.length < 301) {
    canSubmit = true;
  }

  const submitHandler = async () => {
    if (!canSubmit) return;
    setLoading(true);
    type retType = {
      data: CreatePostMutation;
    };
    let ret: retType;
    try {
      if (!img) {
        ret = (await API.graphql({
          query: createPost,
          variables: { input: { title, username: user!.username, content } },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as retType;
      } else {
        const imgPath = uuid();
        await Storage.put(imgPath, img, { contentType: img.type });
        ret = (await API.graphql({
          query: createPost,
          variables: {
            input: { title, content, username: user!.username, image: imgPath },
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as retType;
      }
      setLoading(false);
      navigate(`/post/${ret.data.createPost!.id}`);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab
          icon={<ArticleIcon />}
          iconPosition="start"
          label="Post"
          color="secondary.main"
          sx={{ color: 'secondary.main' }}
        />
        <Tab icon={<ImageIcon />} iconPosition="start" label="Image" />
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
        {tab === 1 && (
          <ImageTab
            title={title}
            setTitle={setTitle}
            img={img}
            setImg={setImg}
          />
        )}
      </Box>
      <Divider />
      <Box sx={{ alignSelf: 'flex-end', mr: 2, mb: 2, mt: 1 }}>
        {!loading && (
          <Button
            onClick={submitHandler}
            variant="contained"
            color="secondary"
            sx={{ cursor: canSubmit ? 'pointer' : 'not-allowed' }}
          >
            Post
          </Button>
        )}
        {loading && (
          <LoadingButton variant="contained" loading>
            Post
          </LoadingButton>
        )}
      </Box>
    </Paper>
  );
};

export default CreatePostForm;
