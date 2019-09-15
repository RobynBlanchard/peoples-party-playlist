import React from 'react';
import Track from '../Track';
import VoteDetails from '../VoteDetails';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
`;

const VoteDetailsWrapper = styled.div`
  height: 30px;
  width: 80px;
`;

const Tracks = ({
  playlist,
  trackError,
  session,
  updateTrackNumOfVotes,
  removeTrack
}) => {
  const oneSecondAgo = () => {
    const d = new Date();
    d.setSeconds(d.getSeconds() - 1);

    return d.toISOString();
  };

  return (
    <Table>
      <tbody>
        {playlist.map((track, index) => {
          const { artist, name, votes, uri, updatedAt } = track;

          if (trackError && trackError.position === index) {
            console.log('==track error==', trackError.error.displayMessage);
          }

          return (
            <Track
              name={name}
              artist={artist}
              isLocked={false}
              shouldFocus={updatedAt > oneSecondAgo()}
              key={`${uri}-${index}`}
            >
              <VoteDetailsWrapper>
                <VoteDetails
                  position={index}
                  uri={uri}
                  handleUpVote={updateTrackNumOfVotes}
                  handleDownVote={updateTrackNumOfVotes}
                  removeTrack={removeTrack}
                  votes={votes}
                  playlist={playlist}
                  sessionStarted={session.sessionStarted}
                />
              </VoteDetailsWrapper>
            </Track>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Tracks;
