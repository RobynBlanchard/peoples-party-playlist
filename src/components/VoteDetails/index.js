import React from 'react';
import { VotesContent, VotesText, Button, Icon } from './styles';



const handleClick = (uri, position, handleVote, setRecentlyClicked, change, playlist, sessionStarted) => {
  handleVote(uri, position, change);
  setRecentlyClicked(uri);
};

const VoteDetails = ({
  position,
  uri,
  votes,
  handleUpVote,
  handleDownVote,
  setRecentlyClicked,
  shouldFocus,
  playlist,
  sessionStarted
}) => {
  return (
    <VotesContent>
      <Button
        onClick={() =>
          handleClick(uri, position, handleDownVote, setRecentlyClicked, -1)
        }
      >
        <Icon src={`images/white-minus.svg`} />
      </Button>
      <VotesText>{votes}</VotesText>
      <Button
        onClick={() =>
          handleClick(uri, position, handleUpVote, setRecentlyClicked, 1)
        }
      >
        <Icon src={`images/white-plus.svg`} />
      </Button>
    </VotesContent>
  );
};

export default VoteDetails;
