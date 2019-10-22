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

const VoteDetails = ({
  position,
  uri,
  votes,
  handleUpVote,
  handleDownVote,
  removeTrack,
  minusImg,
  plusImg,
  shouldFocus
}) => {
  const [input, setInput] = useState(votes);

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

    if (newVotes >= -5) {
      setInput(prevState => {
        return (prevState += value);
      });

      newVotes === -5
        ? removeTrack(uri, position)
        : debounceCallback(newVotes, setNumVotes, uri, position);
    }
  };

  return (
    <Wrapper>
      <DefaultButton
        onClick={() => onInputChangeHandler(-1, handleDownVote, uri, position)}
      >
        <Icon src={minusImg} />
      </DefaultButton>
      <VotesText shouldFocus={shouldFocus}>{input}</VotesText>
      <DefaultButton
        onClick={() => onInputChangeHandler(1, handleUpVote, uri, position)}
      >
        <Icon src={plusImg} />
      </DefaultButton>
    </Wrapper>
  );
};

export default VoteDetails;
