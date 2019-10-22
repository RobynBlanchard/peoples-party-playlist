import React, { useState, useEffect, useCallback } from 'react';
import { Wrapper, VotesText, Icon } from './styles';
import { DefaultButton } from '../../globalStyles';

const debounce = (fn, delay) => {
  let timeoutId;
  return function(...args) {
    clearInterval(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

// TODO:
// work out what to do with vote limits and debounec
// add back -5 to remove
// tests
// tidy up
// debounce to search

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
  // use redux state instead ?
  const [input, setInput] = useState(votes);

  console.log('input', input)
  console.log('votes', votes)

  useEffect(() => {
    setInput(votes);
  }, [votes]);

  const debounceCallback = useCallback(
    debounce((value, setNumVotes, uri, position) => {
      setNumVotes(uri, position, value);
    }, 500),
    []
  );

  const onInputChangeHandler = (value, setNumVotes, uri, position) => {
    const newVotes = input + value;
    console.log(upVoters)
      console.log(downVoters)
        console.log(userId)

        console.log('value', value)

    if (value > 0) {
      if (upVoters && upVoters[userId] > 2) {
        console.log('limit exceeded')
        return upVoteLimitExceeded(position)
      }

    } else {

        if (downVoters && downVoters[userId] > 1) {
          return downVoteLimitExceeded(position)
        }
    }

    // debugger

    // if vote limit exceeded dispatch vote error ?


    if (newVotes >= -5) {
      setInput(prevState => {
        return (prevState += value);
      });

      newVotes === -5
        ? removeTrack(uri, position)
        : debounceCallback(newVotes, setNumVotes, uri, position);
    }
  };

  // pass in voters and show error ?


  return (
    <Wrapper>
      <DefaultButton
        onClick={() => onInputChangeHandler(-1, handleDownVote, uri, position)}
      >
        <Icon src="images/white-minus.svg" />
      </DefaultButton>
      <VotesText shouldFocus={shouldFocus}>{input}</VotesText>
      <DefaultButton
        onClick={() => onInputChangeHandler(1, handleUpVote, uri, position)}
      >
        <Icon src="images/white-plus.svg" />
      </DefaultButton>
    </Wrapper>
  );
};

export default VoteDetails;
