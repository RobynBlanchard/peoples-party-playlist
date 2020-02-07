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
  const [input, setInput] = useState(0);
  const [Vinput, VsetInput] = useState(0);
  const debouncedInput = useDebounce(Vinput, 500);

  useEffect(() => {
    debouncedInput && handleUpVote(position, Vinput)
  }, [debouncedInput])

  useEffect(() => {
    VsetInput(votes)
  }, [votes])

  // useEffect(() => {
  //   debugger
  //   setInput(0)
  // }, [votes])

  // useEffect(() => {
  //   // console.log('use effect votes', votes);
  //   // console.log('use effect input', input);
  //   // console.log('use effect debound', debouncedInput);
  //   // console.log('vals', votes + input);
  //   // console.log('debouncedInput', debouncedInput);
  //   console.log('setting input 0')
  //   // debugger
  //   setInput(0)
  //   // setVotess(votes + input)
  // }, [votes]);
  
  // useEffect(() => {
  //   // debugger
  //   console.log('herrrrrreee')
  //   if (debouncedInput + votes !== votes) {
  //     input + votes > votes
  //       ? handleUpVote(position, input + votes)
  //       : handleDownVote(position, input + votes);
  //   }
  // }, [debouncedInput]);


  const onUpVoteHandler = () => {
    const newVotes = input + votes + 1;

    if (
      (upVoters && upVoters[userId] >= upVoteLimit) ||
      newVotes - votes > upVoteLimit
    ) {
      return upVoteLimitExceeded(position);
    }

    if ((upVoters && upVoters[userId]) + newVotes - votes === upVoteLimit) {
      // setInput(newVotes);
      console.log('set input');

      VsetInput(prevInput => prevInput + 1);

      return handleUpVote(position, newVotes);
    }

    // setInput(newVotes);
    console.log('set input');
    VsetInput(prevInput => prevInput + 1);
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

      return handleDownVote(position, input - 1);
    }

    if (newVotes >= -5) {
      setInput(newVotes);

      if (newVotes === -5) {
        return removeTrack(uri, position);
      }
    }
    setInput(newVotes);
  };

  
  // const val = debouncedInput ? votes : votes + input
  
  console.log('votes', votes);
  console.log('input', input);
  console.log('input', Vinput);

  // console.log('debouncedInput', debouncedInput);
  // console.log('vals', votes + input);

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
