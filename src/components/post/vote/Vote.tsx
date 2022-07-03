import { API } from 'aws-amplify';
import { FunctionComponent, useState, MouseEvent, useEffect } from 'react';
import { IconButton, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAuth } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import { getVote } from '../../../graphql/queries';

type VoteState = 'UP' | 'DOWN' | 'NONE';

const Vote: FunctionComponent = () => {
  const [_vote, setVote] = useState('Vote');
  const navigate = useNavigate();
  const [currentVoteState, setCurrentVoteState] = useState<VoteState>('NONE');
  const { user } = useAuth();
  const upVoteHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    if (currentVoteState === 'UP') {
      setCurrentVoteState('NONE');
    } else {
      setCurrentVoteState('UP');
    }
  };
  const downVoteHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    if (currentVoteState === 'DOWN') {
      setCurrentVoteState('NONE');
    } else {
      setCurrentVoteState('DOWN');
    }
  };
  const isUpVote = currentVoteState === 'UP';
  const isDownVote = currentVoteState === 'DOWN';

  useEffect(() => {
    API.graphql({ query: getVote, variables: {} });
  }, []);

  return (
    <>
      <IconButton onClick={upVoteHandler} sx={{ padding: { xs: 0, sm: 1 } }}>
        <ArrowDropUpIcon
          fontSize="large"
          sx={{ color: isUpVote ? 'primary.main' : 'text.secondary' }}
        />
      </IconButton>
      <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{_vote}</Typography>
      <IconButton onClick={downVoteHandler} sx={{ padding: { xs: 0, sm: 1 } }}>
        <ArrowDropDownIcon
          fontSize="large"
          sx={{ color: isDownVote ? 'info.main' : 'text.secondary' }}
        />
      </IconButton>
    </>
  );
};

export default Vote;
