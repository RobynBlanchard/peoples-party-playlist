import React, { useState, useEffect, useCallback } from 'react';
import { Wrapper, VotesText, Icon } from './styles';
import { DefaultButton } from '../../globalStyles';
import useDebounce from '../useDebounce';

// TODO:
// tests
// use redux state instead of component state
// check how to only call use effect when required

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
  const debouncedInput = useDebounce(votes, input, 500);

  useEffect(
    () => {
      // TODO: votes is wrong
      // console.log('input', input);

      // console.log('debouncedInput', debouncedInput);
      // if (debouncedInput && debouncedInput !== votes) {
      if (debouncedInput && debouncedInput !== votes) {
      console.log('handle vote')
      console.log('votes', votes)
      console.log('input', input)
      console.log('debouncedInpute', debouncedInput)
      // console.log('debouncedInpute', debouncedInput)

        votes - input > 0
          ? handleUpVote(uri, position, input)
          : handleDownVote(uri, position, input);
      }
    },
    [debouncedInput] // Only call effect if debounced search term changes
  );

  // const onInputChangeHandler = (value, setNumVotes, uri, position) => {
  //   const newVotes = input + value;

  //   if (value > 0) {
  //     if ((upVoters && upVoters[userId] >= 3) || newVotes - votes > 3) {
  //       return upVoteLimitExceeded(position);
  //     }
  //   } else {
  //     if ((downVoters && downVoters[userId] >= 2) || votes - newVotes > 2) {
  //       return downVoteLimitExceeded(position);
  //     }
  //   }

  //   if (newVotes >= -5) {
  //     setInput(prevState => {
  //       return (prevState += value);
  //     });

  //     if (newVotes === -5) {
  //       removeTrack(uri, position);
  //     }
  //   }
  // };

  // TODO:
  // if  upVoters[userId] - 3=== 0 then don't wait for debunce
  // set votes
  // then show error if vote again

  const onUpVoteHandler = () => {
    const newVotes = input + 1;

    if ((upVoters && upVoters[userId] >= 3) || newVotes - votes > 3) {
      console.log('limit exceeded')

      return upVoteLimitExceeded(position);
    }

    if ((upVoters && upVoters[userId]) + newVotes - votes === 3) {
      console.log('hit vote limit')

      setInput(newVotes);

      return handleUpVote(uri, position, input + 1);
    }

    setInput(newVotes);

    // setInput(prevState => {
    //   return (prevState += value);
    // });
  };

  const onDownVoteHandler = () => {
    const newVotes = input - 1;
    if ((downVoters && downVoters[userId] >= 2) || votes - newVotes > 2) {
      console.log('down limit exceeded')

      return downVoteLimitExceeded(position);
    }

//     console.log('downVoters', downVoters && downVoters[userId]);
//     console.log('votes!', votes);
//     console.log('newVotes!', newVotes);

//     console.log('votes - newVotes === 2', votes - newVotes === 2)
// console.log('(downVoters && downVoters[userId]) + votes - newVotes === 2', (downVoters && downVoters[userId]) + votes - newVotes === 2)
    if (
      votes - newVotes === 2 ||
      (downVoters && downVoters[userId]) + votes - newVotes === 2
    ) {
      console.log('hit down vote limit------------')

      // console.log('here 1')
      console.log('votes!', votes);
      console.log('newVotes!', newVotes);
      console.log('downVoters!', downVoters && downVoters[userId]);

      // console.log('here!', votes - newVotes);
      setInput(newVotes);

      return handleDownVote(uri, position, input - 1);
    }

    if (newVotes >= -5) {
      // setInput(prevState => {
      //   return (prevState += value);
      // });
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
