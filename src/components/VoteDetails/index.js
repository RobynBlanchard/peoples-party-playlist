import React, { useState, useCallback } from 'react';
import { Wrapper, VotesText, Icon } from './styles';
import { DefaultButton } from '../../globalStyles';

const debounce = (fn, delay) => {
  let timeoutId;
  return function(...args) {
    clearInterval(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

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
  // const handleClick = (uri, position, handleVote, change) => {

  //   if (votes + change === -5) {
  //     removeTrack(uri, position);
  //   } else {
  //     handleVote(uri, position, change);
  //   }
  // };

  const [input, setInput] = useState(votes);

  React.useEffect(() => {
    setInput(votes);
  }, [votes]);

  const debounceCallback = useCallback(
    debounce((value, setNumVotes, uri, position) => {
      // console.log('value: ', value)
      setNumVotes(uri, position, value);

      // if not loading
      // if update sucess
      // setInput(votes)
    }, 500),
    []
  );

  console.log('vote details');
  console.log('votes', votes);
  console.log('input', input);

  const onInputChangeHandler = (value, setNumVotes, uri, position) => {
    setInput(prevState => {
      // console.log('prevstate', prevState)
      // console.log(prevState += value)
      // debugger
      return (prevState += value);
      // return prevState
    });
    console.log('input', input);
    console.log('value', value);

    debounceCallback(input + value, setNumVotes, uri, position);
  };

  // just pass new num of votes instead of change?

  // console.log('input', input)
  console.log('votes', votes);

  return (
    <Wrapper>
      <DefaultButton
        // onClick={() => handleClick(uri, position, handleDownVote, -1)}
        onClick={() => onInputChangeHandler(-1, handleDownVote, uri, position)}
      >
        <Icon src={minusImg} />
      </DefaultButton>
      {/* <VotesText>{votes}</VotesText> */}
      <VotesText shouldFocus={shouldFocus}>{input}</VotesText>
      <DefaultButton
        // onClick={() => handleClick(uri, position, handleUpVote, 1)}
        onClick={() => onInputChangeHandler(1, handleUpVote, uri, position)}
      >
        <Icon src={plusImg} />
      </DefaultButton>
    </Wrapper>
  );
};

export default VoteDetails;
