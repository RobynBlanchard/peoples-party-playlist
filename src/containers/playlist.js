import React from 'react';
import { connect } from 'react-redux';
import {
  fetchPlaylist,
  updateTrackNumOfVotes,
  resumePlayback,
  pausePlayback,
  getCurrentlyPlayingTrack,
  removeTrack,
  startSession,
  updateCurrentTrack,
} from '../actions';
import Heading from '../components/Heading';
import LockedTrack from '../components/LockedTrack';
import Tracks from '../components/Tracks';
import requireAuth from './requireAuth';
import ErrorIndicator from '../components/ErrorIndicator';
import { Container } from '../globalStyles'

class Playlist extends React.Component {
  componentDidMount() {
    const { playlist, fetchPlaylist } = this.props;

    if (playlist.playablePlaylist.length === 0) {
      fetchPlaylist();
    }
    this.timer = setInterval(() => this.getCurrentlyPlaying(), 1000);
  }

  getCurrentlyPlaying() {
    const { session, getCurrentlyPlayingTrack } = this.props;

    if (session.sessionStarted) {
      getCurrentlyPlayingTrack();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentTrack, updateCurrentTrack, session } = this.props;

    if (
      session.sessionStarted &&
      currentTrack.uri &&
      nextProps.currentTrack.uri !== currentTrack.uri
    ) {
      updateCurrentTrack();
    }
  }

  render() {
    const {
      playlist,
      playing,
      resumePlayback,
      pausePlayback,
      playbackError,
      session
    } = this.props;
    const { playablePlaylist, lockedTrack, error: playlistError } = playlist;
    const { error: sessionError } = session.sessionStarted;

    let error = playlistError || playbackError || sessionError;

    if (error) return <ErrorIndicator message={error.displayMessage} />;

    if (playablePlaylist.length === 0 && lockedTrack.length === 0) {
      return null;
    }

    const { updateTrackNumOfVotes, removeTrack } = this.props;
    const { trackError } = this.props.playlist;

    return (
      <Container>
        <Heading
          text={'Party Playlist'}
          img={`images/${playing ? 'pause' : 'play'}-circle-regular.svg`}
          handleClick={playing ? pausePlayback : resumePlayback}
        />
        {lockedTrack.length > 0 && (
          <LockedTrack track={lockedTrack[0]} playing={playing} />
        )}

        <Tracks
          playlist={playablePlaylist}
          trackError={trackError}
          session={session}
          updateTrackNumOfVotes={updateTrackNumOfVotes}
          removeTrack={removeTrack}
        />
      </Container>
    );
  }
}

Playlist.serverFetch = fetchPlaylist;

const mapStateToProps = state => {
  return {
    playlist: state.playlist,
    playing: state.playback.playing,
    session: state.session,
    currentTrack: state.playback.currentTrack,
    playbackError: state.playback.error
  };
};

// export default requireAuth(
export default connect(
  mapStateToProps,
  {
    fetchPlaylist,
    removeTrack,
    updateTrackNumOfVotes,
    resumePlayback,
    pausePlayback,
    getCurrentlyPlayingTrack,
    startSession,
    updateCurrentTrack,
  }
)(Playlist);
