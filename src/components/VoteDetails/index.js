import React from 'react';
import { VotesContent, VotesText, Button, Icon } from './styles';

const VoteDetails = ({
  position,
  uri,
  votes,
  handleUpVote,
  handleDownVote,
  removeTrack
}) => {
  const handleClick = (uri, position, handleVote, change) => {
    if (votes + change === -5) {
      removeTrack(uri, position);
    } else {
      handleVote(uri, position, change);
    }
  };

  return (
    <VotesContent>
      <Button onClick={() => handleClick(uri, position, handleDownVote, -1)}>
        <Icon src={`images/white-minus.svg`} />
      </Button>
      <VotesText>{votes}</VotesText>
      <Button onClick={() => handleClick(uri, position, handleUpVote, 1)}>
        <Icon src={`images/white-plus.svg`} />
      </Button>
    </VotesContent>
  );
};

export default VoteDetails;
