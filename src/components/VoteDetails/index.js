import React, { useState, useEffect, useCallback } from 'react';
import { Wrapper, VotesText, Icon } from './styles';
import { DefaultButton } from '../../globalStyles';
import useDebounce from '../useDebounce';
import {
  upVoteLimit,
  downVoteLimit,
  minimumVotes
} from '../../utils/constants';

const VoteDetails = ({
  position,
  uri,
  votes,
  handleUpVote,
  handleDownVote,
  removeTrack,
  upVoters,
  downVoters,
  userId,
  shouldFocus,
  upVoteLimitExceeded,
  downVoteLimitExceeded
}) => {
  const [updatedVotes, setUpdatedVotes] = useState(votes);
  const debouncedInput = useDebounce(updatedVotes, 500);

  useEffect(() => {
    if (debouncedInput !== votes) {
      debouncedInput >= votes
        ? handleUpVote(position, updatedVotes)
        : handleDownVote(position, updatedVotes);
    }
  }, [debouncedInput]);

  useEffect(() => {
    setUpdatedVotes(votes);
  }, [votes]);

  const onUpVoteHandler = () => {
    const voteLimitReached =
      (upVoters[userId] || 0) + updatedVotes - votes + 1 > upVoteLimit;

    if (voteLimitReached) {
      return upVoteLimitExceeded(position);
    }

    setUpdatedVotes(prevVotes => prevVotes + 1);
  };

  const onDownVoteHandler = () => {
    const voteLimitReached =
      (downVoters[userId] || 0) + votes - updatedVotes + 1 > downVoteLimit;

    if (voteLimitReached) {
      return downVoteLimitExceeded(position);
    }

    if (updatedVotes === minimumVotes) {
      return removeTrack(uri, position);
    }

    setUpdatedVotes(prevVotes => prevVotes - 1);
  };

  return (
    <Wrapper>
      <DefaultButton onClick={onDownVoteHandler}>
        <Icon src="images/white-minus.svg" />
      </DefaultButton>
      <VotesText shouldFocus={shouldFocus}>{updatedVotes}</VotesText>
      <DefaultButton onClick={onUpVoteHandler}>
        <Icon src="images/white-plus.svg" />
      </DefaultButton>
    </Wrapper>
  );
};

export default VoteDetails;
