import React from 'react';
import styled from 'styled-components';
import { Container, DefaultButton } from '../globalStyles';
import Tracks from '../components/Tracks';
import LockedTrack from '../components/LockedTrack';

const Heading = styled.div`
  display: flex;
`;

const PlaybackIcon = styled.img`
  height: 40px;
  width: 40px;
  padding: 16px;
`;

const PlaylistTemplate = ({ playback, playlist }) => {
  const { pausePlayback, resumePlayback, playing } = playback;
  const {
    tracks,
    lockedTrack,
    trackError,
    updateTrackVotes,
    removeTrack,
    userId,
    upVoteLimitExceeded,
    downVoteLimitExceeded
  } = playlist;

  // console.log('render --------------', lockedTrack)

  return (
    <Container>
      <Heading>
        <DefaultButton onClick={playing ? pausePlayback : resumePlayback}>
          <PlaybackIcon
            src={`images/${playing ? 'pause' : 'play'}-circle-regular.svg`}
          />
        </DefaultButton>
        <h2>Party Playlist</h2>
      </Heading>
      {lockedTrack.length > 0 && (
        <LockedTrack track={lockedTrack[0]} playing={playing} />
      )}
      <Tracks
        playlist={tracks}
        trackError={trackError}
        updateTrackNumOfVotes={updateTrackVotes}
        removeTrack={removeTrack}
        userId={userId}
        upVoteLimitExceeded={upVoteLimitExceeded}
        downVoteLimitExceeded={downVoteLimitExceeded}
      />
    </Container>
  );
};

export default PlaylistTemplate;
