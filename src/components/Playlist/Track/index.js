import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const Container = styled.div`
  border-bottom: solid 1px #333333;
  width: 920px;
  height: 50px;
  margin: 5px;

  display: flex;
  justify-content: space-between;

  &:focus-within {
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    border-radius: 100px;
    background: rgba(177, 228, 86, 0.16);
    color: pink;
  }

  ${({ lockedTrack }) =>
    lockedTrack &&
    css`
      border: 1px solid grey;
      background-color: #87868614;
      border-radius: 24px;
      box-shadow: white;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 1);
    `}}
`;

const VotesContainer = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const VotesText = styled.p`
  padding: 10px;
  width: 20px;
  text-align: center;
`;

const TrackDetails = styled.div`
  width: 550px;
  height: 100%;
  padding: 0 10px;
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
`;

const List = styled.li`
  list-style: none;
`

class Track extends React.Component {
  renderLockedTrackDetails() {
    const { playbackState } = this.props;

    const icon = playbackState === 'playingAndlocked' ? 'volume' : 'pause';

    return (
      <VotesContainer>
        <Icon src={`http://localhost:3000/images/${icon}.svg`} />
      </VotesContainer>
    );
  }

  renderDetailedTrackDetails() {
    const { downVoteAction, upVoteAction, trackDetails, position } = this.props;

    return (
      <VotesContainer>
        <Button
          onClick={() =>
            downVoteAction(
              trackDetails.id,
              trackDetails.position,
              trackDetails.uri
            )
          }
        >
          <Icon src="http://localhost:3000/images/minus.svg" />
        </Button>
        <VotesText>{trackDetails.votes}</VotesText>
        <Button
          onClick={() => upVoteAction(trackDetails.id, position)}
        >
          <Icon src="http://localhost:3000/images/plus.svg" />
        </Button>
      </VotesContainer>
    );
  }

  render() {
    const { playbackState, trackDetails } = this.props;

    return (
      <List>
        <Container
          lockedTrack={
            playbackState === 'playingAndlocked' ||
            playbackState === 'pausedAndLocked'
          }
        >
          <TrackDetails>
            <p>{trackDetails.artist + ' - ' + trackDetails.name}</p>
          </TrackDetails>
          {playbackState ? this.renderLockedTrackDetails() : this.renderDetailedTrackDetails()}
        </Container>
      </List>
    );
  }
}

export default Track;
