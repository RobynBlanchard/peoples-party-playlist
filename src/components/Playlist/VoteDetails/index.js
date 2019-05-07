import React from 'react';
import {
  VotesContent,
  VotesText,
  Button,
  Icon
} from './styles';

const VoteDetails = ({
  position,
  uri,
  votes,
  handleUpVote,
  handleDownVote,
}) => {
    return (
      <VotesContent>
        <Button onClick={() => handleDownVote(position, uri)}>
          <Icon src="images/minus.svg" />
        </Button>
        <VotesText>{votes}</VotesText>
        <Button onClick={() => handleUpVote(uri, position)}>
          <Icon src="images/plus.svg" />
        </Button>
      </VotesContent>
    );
  // }
};

export default VoteDetails;
