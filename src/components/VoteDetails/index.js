import React, { useState, useEffect, useCallback } from 'react';
import { Wrapper, VotesText, Icon } from './styles';
import { DefaultButton } from '../../globalStyles';
import useDebounce from '../useDebounce';
import { upVoteLimit, downVoteLimit } from '../../utils/constants';

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
  const [input, setInput] = useState(votes);
  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    if (debouncedInput !== votes) {
      input > votes
        ? handleUpVote(uri, position, input)
        : handleDownVote(uri, position, input);
    }
  }, [debouncedInput]);

  const onUpVoteHandler = () => {
    const newVotes = input + 1;

    if (
      (upVoters && upVoters[userId] >= upVoteLimit) ||
      newVotes - votes > upVoteLimit
    ) {
      return upVoteLimitExceeded(position);
    }

    if ((upVoters && upVoters[userId]) + newVotes - votes === upVoteLimit) {
      setInput(newVotes);

      return handleUpVote(uri, position, input + 1);
    }

    setInput(newVotes);
  };

  const onDownVoteHandler = () => {
    const newVotes = input - 1;
    if (
      (downVoters && downVoters[userId] >= downVoteLimit) ||
      votes - newVotes > downVoteLimit
    ) {
      return downVoteLimitExceeded(position);
    }

    if (
      votes - newVotes === 2 ||
      (downVoters && downVoters[userId]) + votes - newVotes === 2
    ) {
      setInput(newVotes);

      return handleDownVote(uri, position, input - 1);
    }

    if (newVotes >= -5) {
      setInput(newVotes);

      if (newVotes === -5) {
        return removeTrack(uri, position);
      }
    }
    setInput(newVotes);
  };

  return (
    <Wrapper>
      <DefaultButton onClick={onDownVoteHandler}>
        <Icon src="images/white-minus.svg" />
      </DefaultButton>
      <VotesText shouldFocus={shouldFocus}>{input}</VotesText>
      <DefaultButton onClick={onUpVoteHandler}>
        <Icon src="images/white-plus.svg" />
      </DefaultButton>
    </Wrapper>
  );
};

export default VoteDetails;
