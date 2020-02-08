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
  const [Vinput, VsetInput] = useState(0);
  const debouncedInput = useDebounce(Vinput, 500);

  useEffect(() => {
    if (debouncedInput + votes !== votes) {
      debouncedInput + votes >= votes
        ? handleUpVote(position, Vinput + votes)
        : handleDownVote(position, Vinput + votes);
    }
  }, [debouncedInput]);

  useEffect(() => {
    VsetInput(0);
  }, [votes]);

  const onUpVoteHandler = () => {
    // console.log('input', input);
    const newVotes = Vinput + 1 + votes;

    if (
      (upVoters && upVoters[userId] >= upVoteLimit) ||
      newVotes - votes > upVoteLimit
    ) {
      return upVoteLimitExceeded(position);
    }

    if ((upVoters && upVoters[userId]) + newVotes - votes === upVoteLimit) {
      // VsetInput(prevInput => prevInput + 1);
      VsetInput(Vinput + 1);

      return handleUpVote(position, newVotes);
    }

    VsetInput(Vinput + 1);
    // VsetInput(prevInput => prevInput + 1);
  };

  const onDownVoteHandler = () => {
    // console.log('input', input);

    // const newVotes = input + votes - 1;

    const newVotes = Vinput + votes - 1;
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
      // VsetInput(newVotes);
      VsetInput(Vinput - 1);

      return handleDownVote(position, newVotes);
    }

    if (newVotes >= -5) {
      // VsetInput(newVotes);
      VsetInput(Vinput - 1);

      if (newVotes === -5) {
        return removeTrack(uri, position);
      }
    }
    // VsetInput(newVotes);
    VsetInput(Vinput - 1);
  };

  // console.log('shouldFocus', shouldFocus);

  return (
    <Wrapper>
      <DefaultButton onClick={onDownVoteHandler}>
        <Icon src="images/white-minus.svg" />
      </DefaultButton>
      <VotesText shouldFocus={shouldFocus}>{Vinput + votes}</VotesText>
      <DefaultButton onClick={onUpVoteHandler}>
        <Icon src="images/white-plus.svg" />
      </DefaultButton>
    </Wrapper>
  );
};

export default VoteDetails;
