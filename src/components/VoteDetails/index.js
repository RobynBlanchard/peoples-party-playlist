import React from 'react';
import { Wrapper, VotesText, Icon } from './styles';
import { DefaultButton } from '../../globalStyles';

const VoteDetails = ({
  position,
  uri,
  votes,
  handleUpVote,
  handleDownVote,
  removeTrack,
  minusImg,
  plusImg
}) => {
  const handleClick = (uri, position, handleVote, change) => {
    if (votes + change === -5) {
      removeTrack(uri, position);
    } else {
      handleVote(uri, position, change);
    }
  };

  return (
    <Wrapper>
      <DefaultButton
        onClick={() => handleClick(uri, position, handleDownVote, -1)}
      >
        <Icon src={minusImg} />
      </DefaultButton>
      <VotesText>{votes}</VotesText>
      <DefaultButton
        onClick={() => handleClick(uri, position, handleUpVote, 1)}
      >
        <Icon src={plusImg} />
      </DefaultButton>
    </Wrapper>
  );
};

export default VoteDetails;
