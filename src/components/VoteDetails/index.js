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
  const [Vinput, VsetInput] = useState(votes);
  const debouncedInput = useDebounce(Vinput, 500);

  useEffect(() => {
    // debugger;
    if (debouncedInput !== votes) {
      // console.log('here')
      debouncedInput >= votes
        ? handleUpVote(position, Vinput)
        : handleDownVote(position, Vinput);
    }
  }, [debouncedInput]);

  useEffect(() => {
    VsetInput(votes);
  }, [votes]);

  const onUpVoteHandler = () => {
    // console.log('input', input);
    const newVotes = Vinput + 1;

    if (
      (upVoters && upVoters[userId] >= upVoteLimit) ||
      newVotes - votes > upVoteLimit
    ) {
      return upVoteLimitExceeded(position);
    }

    if ((upVoters && upVoters[userId]) + newVotes - votes === upVoteLimit) {
      // VsetInput(prevInput => prevInput + 1);
      VsetInput(newVotes);

      return handleUpVote(position, newVotes);
    }

    VsetInput(newVotes);
    // VsetInput(prevInput => prevInput + 1);
  };

  const onDownVoteHandler = () => {
    // console.log('input', input);

    // const newVotes = input + votes - 1;

    const newVotes = Vinput - 1;
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
      VsetInput(newVotes);

      return handleDownVote(position, newVotes);
    }

    if (newVotes >= -5) {
      // VsetInput(newVotes);
      VsetInput(newVotes);

      if (newVotes === -5) {
        return removeTrack(uri, position);
      }
    }
    // VsetInput(newVotes);
    VsetInput(newVotes);
  };

  // console.log('shouldFocus', shouldFocus);

  return (
    <Wrapper>
      <DefaultButton onClick={onDownVoteHandler}>
        <Icon src="images/white-minus.svg" />
      </DefaultButton>
      <VotesText shouldFocus={shouldFocus}>{Vinput}</VotesText>
      <DefaultButton onClick={onUpVoteHandler}>
        <Icon src="images/white-plus.svg" />
      </DefaultButton>
    </Wrapper>
  );
};

export default VoteDetails;
