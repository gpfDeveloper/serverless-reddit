import { API } from 'aws-amplify';
import { FunctionComponent, useState, MouseEvent, useEffect } from 'react';
import { IconButton, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAuth } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import { listVotesPerPost } from '../../../graphql/customerQuery';
import { createVote, updateVote } from '../../../graphql/mutations';
import type { CreateVoteInput, UpdateVoteInput } from '../../../API';
import type { VoteItemProps } from '../../../types/post';

type VoteState = 'UP' | 'DOWN' | 'NONE' | 'NO-VOTE';

type Props = {
  postId: string;
};

const Vote: FunctionComponent<Props> = ({ postId }) => {
  const [vote, setVote] = useState(0);
  const [myVote, setMyVote] = useState<VoteItemProps>();
  const navigate = useNavigate();
  const [currentVoteState, setCurrentVoteState] =
    useState<VoteState>('NO-VOTE');
  const { user } = useAuth();
  const upVoteHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    if (currentVoteState === 'UP') {
      const input: UpdateVoteInput = {
        vote: 0,
        id: myVote!.id,
      };
      try {
        await API.graphql({
          query: updateVote,
          variables: { input },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
      } catch (err) {}
      setCurrentVoteState('NONE');
    } else {
      if (currentVoteState === 'NO-VOTE') {
        const input: CreateVoteInput = {
          vote: 1,
          postVotesId: postId,
        };
        try {
          await API.graphql({
            query: createVote,
            variables: { input },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          });
        } catch (err) {}
      }
      //DOWN or NONE
      else {
        const input: UpdateVoteInput = {
          vote: 1,
          id: myVote!.id,
        };
        try {
          await API.graphql({
            query: updateVote,
            variables: { input },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          });
        } catch (err) {}
      }
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
      const input: UpdateVoteInput = {
        vote: 0,
        id: myVote!.id,
      };
      try {
        await API.graphql({
          query: updateVote,
          variables: { input },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
      } catch (err) {}
      setCurrentVoteState('NONE');
    } else {
      if (currentVoteState === 'NO-VOTE') {
        const input: CreateVoteInput = {
          vote: -1,
          postVotesId: postId,
        };
        try {
          await API.graphql({
            query: createVote,
            variables: { input },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          });
        } catch (err) {}
      }
      //UP or NONE
      else {
        const input: UpdateVoteInput = {
          vote: -1,
          id: myVote!.id,
        };
        try {
          await API.graphql({
            query: updateVote,
            variables: { input },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          });
        } catch (err) {}
      }
      setCurrentVoteState('DOWN');
    }
  };
  const isUpVote = currentVoteState === 'UP';
  const isDownVote = currentVoteState === 'DOWN';

  useEffect(() => {
    const fetchVotes = async () => {
      const ret = (await API.graphql({
        query: listVotesPerPost,
        variables: { id: postId },
        authMode: 'API_KEY',
      })) as { data: { getPost: { votes: { items: any[] } } } };
      const _vote = ret.data.getPost.votes.items.reduce(
        (pre, cur) => pre + cur.vote,
        0
      );
      setVote(_vote);
      if (user && ret.data.getPost.votes.items.length > 0) {
        let myVotes = ret.data.getPost.votes.items.filter(
          (item) => item.owner === user.id
        );
        let myVote: VoteItemProps;
        if (myVotes.length > 0) {
          myVote = myVotes[0];
          setMyVote(myVote);
          if (myVote.vote === 1) {
            setCurrentVoteState('UP');
          } else if (myVote.vote === -1) {
            setCurrentVoteState('DOWN');
          } else {
            setCurrentVoteState('NONE');
          }
        }
      }
    };
    fetchVotes();
  }, [postId, user, currentVoteState]);

  return (
    <>
      <IconButton onClick={upVoteHandler} sx={{ padding: { xs: 0, sm: 1 } }}>
        <ArrowDropUpIcon
          fontSize="large"
          sx={{ color: isUpVote ? 'primary.main' : 'text.secondary' }}
        />
      </IconButton>
      <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
        {vote === 0 ? 'Vote' : vote.toString()}
      </Typography>
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
