import React from 'react';
import styled from 'styled-components';
import Track from '../Track';
import VoteDetails from '../VoteDetails';
import TrackError from '../TrackError';

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
  updateTrackNumOfVotes,
  removeTrack,
  userId,
  upVoteLimitExceeded,
  downVoteLimitExceeded
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
          const { artist, name, votes, uri, updatedAt, upVoters, downVoters } = track;

          if (trackError && trackError.position === index) {
            console.log('==track error==', trackError.error.displayMessage);
          }

          return (
            <React.Fragment key={`${uri}-${index}`}>
              <Track
                name={name}
                artist={artist}
                isLocked={false}
                shouldFocus={updatedAt > oneSecondAgo()}
              >
                <VoteDetailsWrapper>
                  <VoteDetails
                    position={index}
                    uri={uri}
                    votes={votes}
                    handleUpVote={updateTrackNumOfVotes}
                    handleDownVote={updateTrackNumOfVotes}
                    removeTrack={removeTrack}
                    upVoteLimitExceeded={upVoteLimitExceeded}
                    downVoteLimitExceeded={downVoteLimitExceeded}
                    upVoters={upVoters}
                    downVoters={downVoters}
                    userId={userId}
                    shouldFocus={updatedAt > oneSecondAgo()}
                  />
                </VoteDetailsWrapper>
              </Track>
              {trackError && trackError.position === index && (
                <TrackError text={trackError.error.displayMessage} />
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Tracks;
