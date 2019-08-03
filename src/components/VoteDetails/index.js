import React from 'react';
import { VotesContent, VotesText, Button, Icon } from './styles';



const handleClick = (uri, position, handleVote, change, votes, removeTrack) => {
  debugger;
  if (votes + change === -5) {
    removeTrack(uri)
  }
  handleVote(uri, position, change);
  // setRecentlyClicked(uri);
};

const VoteDetails = ({
  position,
  uri,
  votes,
  handleUpVote,
  handleDownVote,
  removeTrack,
  setRecentlyClicked,
  shouldFocus,
  playlist,
  sessionStarted
}) => {
  return (
    <VotesContent>
      <Button
        onClick={() =>
          handleClick(uri, position, handleDownVote, -1, votes, removeTrack)
        }
      >
        <Icon src={`images/white-minus.svg`} />
      </Button>
      <VotesText>{votes}</VotesText>
      <Button
        onClick={() =>
          handleClick(uri, position, handleUpVote, 1, votes, removeTrack)
        }
      >
        <Icon src={`images/white-plus.svg`} />
      </Button>
    </VotesContent>
  );
};

export default VoteDetails;
