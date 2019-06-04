import React from 'react';
import { VotesContent, VotesText, Button, Icon } from './styles';



const handleClick = (uri, position, handleVote, setRecentlyClicked, playlist, sessionStarted) => {
  handleVote(uri, position);
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
          handleClick(uri, position, handleDownVote, setRecentlyClicked)
        }
      >
        <Icon src={`images/${shouldFocus ? 'black-' : 'white-'}minus.svg`} />
      </Button>
      <VotesText>{votes}</VotesText>
      <Button
        onClick={() =>
          handleClick(uri, position, handleUpVote, setRecentlyClicked)
        }
      >
        <Icon src={`images/${shouldFocus ? 'black-' : 'white-'}plus.svg`} />
      </Button>
    </VotesContent>
  );
};

export default VoteDetails;
