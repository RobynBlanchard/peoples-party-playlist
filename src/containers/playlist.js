import React from 'react';
import { connect } from 'react-redux';

import {
  fetchPlaylist,
  updateTrackNumOfVotes,
  resumePlayback,
  pausePlayback,
  getCurrentlyPlayingTrack,
  removeTrack,
  updateTrack
} from '../actions';
import Heading from '../components/Heading';
import Track from '../components/Track';
import VoteDetails from '../components/VoteDetails';
import Icon from '../components/Icon';
import ContentContainer from '../components/ContentContainer';
import requireAuth from './requireAuth';
import ErrorIndicator from '../components/ErrorIndicator';

class Playlist extends React.Component {
  componentDidMount() {
    const { playlist, fetchPlaylist } = this.props;

    if (playlist.playablePlaylist.length === 0) {
      fetchPlaylist();
    }
    this.timer = setInterval(() => this.getCurrentlyPlaying(), 1000);
  }

  getCurrentlyPlaying() {
    const { sessionStarted, getCurrentlyPlayingTrack } = this.props;
    console.log('session started', sessionStarted)

    if (sessionStarted) {
      getCurrentlyPlayingTrack();
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   Object.entries(this.props).forEach(([key, val]) => {
  //     prevProps[key] !== val && console.log(`Prop '${key}' changed`)
  //   }

  //   );
  // Object.entries(this.state).forEach(([key, val]) =>
  //   prevState[key] !== val && console.log(`State '${key}' changed`)
  // );
  // }

  renderCurrentlyPlaying(playing, track) {
    const { artist, name, uri } = track;

    return (
      <Track
        name={name}
        artist={artist}
        isLocked={true}
        shouldFocus={false}
        key={`${uri}-${name}`}
      >
        <Icon isPlaying={playing} />
      </Track>
    );
  }

  renderTracks(playlist) {
    const {
      sessionStarted,
      updateTrackNumOfVotes,
      removeTrack
    } = this.props;

    let position = -1;
    return playlist.map(el => {
      position += 1;
      const { artist, name, votes, uri, updatedAt } = el;

      const fiveSecondsAgo = () => {
        const d = new Date();
        d.setSeconds(d.getSeconds() - 2);

        return d.toISOString();
      };

      return (
        <Track
          name={name}
          artist={artist}
          isLocked={false}
          shouldFocus={updatedAt > fiveSecondsAgo()}
          key={`${uri}-${position}`}
        >
          <VoteDetails
            position={position}
            uri={uri}
            handleUpVote={updateTrackNumOfVotes}
            handleDownVote={updateTrackNumOfVotes}
            removeTrack={removeTrack}
            votes={votes}
            playlist={playlist}
            sessionStarted={sessionStarted}
          />
        </Track>
      );
    });
  }

  render() {
    const { playlist, playing, resumePlayback, pausePlayback, playbackError } = this.props;
    const { playablePlaylist, error, lockedTrack} = playlist;

    if (error || playbackError) return <ErrorIndicator />;

    if ((playablePlaylist.length === 0) && (lockedTrack.length === 0)) {
      return null;
    }

    const lockedOne = lockedTrack;
    const restOfList = playablePlaylist;

    return (
      <ContentContainer>
        <Heading
          text={'Party Playlist'}
          img={`images/${playing ? 'pause' : 'play'}-circle-regular.svg`}
          handleClick={playing ? pausePlayback : resumePlayback}
        />
        {lockedOne.length !== 0 &&
          this.renderCurrentlyPlaying(playing, lockedOne[0])}

        {this.renderTracks(restOfList)}
      </ContentContainer>
    );
  }
}

Playlist.serverFetch = fetchPlaylist;

const mapStateToProps = state => {
  return {
    playlist: state.playlists,
    playing: state.playback.playing,
    sessionStarted: state.session.sessionStarted,
    currentTrack: state.playback.currentTrack,
    playbackError: state.playback.error,
  };
};

// TODO:- put back
// export default requireAuth(connect(
export default connect(
  mapStateToProps,
  {
    fetchPlaylist,
    removeTrack,
    updateTrackNumOfVotes,
    resumePlayback,
    pausePlayback,
    getCurrentlyPlayingTrack,
    updateTrack
  }
)(Playlist);
