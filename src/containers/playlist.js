import React from 'react';
import { connect } from 'react-redux';

import {
  fetchPlaylist,
  updateTrackNumOfVotes,
  resumePlayback,
  pausePlayback,
  getCurrentlyPlayingTrack,
  removeTrack,
  updateTrack,
  startSession,
  updateCurrentTrack
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
    const {
      playlist,
      fetchPlaylist,
      sessionStarted,
      playing,
      startSession
    } = this.props;

    if (playlist.playablePlaylist.length === 0) {
      fetchPlaylist();
    }
    this.timer = setInterval(() => this.getCurrentlyPlaying(), 1000);
  }

  getCurrentlyPlaying() {
    const { sessionStarted, getCurrentlyPlayingTrack } = this.props;

    if (sessionStarted) {
      getCurrentlyPlayingTrack();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { sessionStarted, playing, startSession, currentTrack } = this.props;

    // do this in action instead?
    if (playing && !sessionStarted) startSession();

    // check for sessionStarted / lockedTrack.length > 0
    if (
      prevProps.currentTrack.uri &&
      prevProps.currentTrack.uri !== currentTrack.uri
    ) {
      this.props.updateCurrentTrack();
    }
  }

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
    const { sessionStarted, updateTrackNumOfVotes, removeTrack } = this.props;

    let position = -1;
    return playlist.map(el => {
      position += 1;
      const { artist, name, votes, uri, updatedAt, error } = el;

      const fiveSecondsAgo = () => {
        const d = new Date();
        d.setSeconds(d.getSeconds() - 2);

        return d.toISOString();
      };

      if (error) {
        console.log('==track error==', el.error);
      }

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
    const {
      playlist,
      playing,
      resumePlayback,
      pausePlayback,
      playbackError
    } = this.props;
    const { playablePlaylist, error, lockedTrack } = playlist;

    if (error || playbackError) return <ErrorIndicator />;

    if (playablePlaylist.length === 0 && lockedTrack.length === 0) {
      return null;
    }

    return (
      <ContentContainer>
        <Heading
          text={'Party Playlist'}
          img={`images/${playing ? 'pause' : 'play'}-circle-regular.svg`}
          handleClick={playing ? pausePlayback : resumePlayback}
        />
        {lockedTrack.length !== 0 &&
          this.renderCurrentlyPlaying(playing, lockedTrack[0])}

        {this.renderTracks(playablePlaylist)}
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
    playbackError: state.playback.error
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
    updateTrack,
    startSession,
    updateCurrentTrack
  }
)(Playlist);
