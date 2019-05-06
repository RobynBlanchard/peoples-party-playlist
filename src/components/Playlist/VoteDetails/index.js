import React from 'react';
import {
  VotesContent,
  VotesText,
  Button,
  Icon
} from './styles';

const VoteDetails = ({
  id,
  position,
  uri,
  votes,
  handleUpVote,
  handleDownVote,
  // lockedStatus
}) => {
  // if (
  //   lockedStatus === 'playingAndlocked' ||
  //   lockedStatus === 'pausedAndLocked'
  // ) {
  //   const icon = lockedStatus === 'playingAndlocked' ? 'volume' : 'pause';

  //   return (
  //     <VotesContent>
  //       <Icon src={`images/${icon}.svg`} />
  //     </VotesContent>
  //   );
  // } else {
    return (
      <VotesContent>
        <Button onClick={() => handleDownVote(id, position, uri)}>
          <Icon src="images/minus.svg" />
        </Button>
        <VotesText>{votes}</VotesText>
        <Button onClick={() => handleUpVote(id, position)}>
          <Icon src="images/plus.svg" />
        </Button>
      </VotesContent>
    );
  // }
};

export default VoteDetails;
