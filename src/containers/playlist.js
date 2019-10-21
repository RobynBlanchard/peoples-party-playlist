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
  updateCurrentTrack
} from '../actions';
import requireAuth from '../components/RequireAuth';
import ErrorIndicator from '../components/ErrorIndicator';
import PlaylistTemplate from '../templates/Playlist';
class Playlist extends React.Component {
  componentDidMount() {
    const { playlist, fetchPlaylist } = this.props;
    const { tracks } = playlist;

    if (tracks.length === 0) {
      fetchPlaylist();
    }
    this.timer = setInterval(() => this.getCurrentlyPlaying(), 1000);
  }

  getCurrentlyPlaying() {
    const { session, getCurrentlyPlayingTrack } = this.props;
    const { sessionStarted } = session;

    if (sessionStarted) {
      getCurrentlyPlayingTrack();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentTrack, updateCurrentTrack, session } = this.props;
    const { sessionStarted } = session;

    if (
      sessionStarted &&
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
      session,
      updateTrackNumOfVotes,
      removeTrack
    } = this.props;
    const { tracks, lockedTrack, error: playlistError, trackError } = playlist;
    const { error: sessionError } = session;

    let error = playlistError || playbackError || sessionError;

    if (error) return <ErrorIndicator message={error.displayMessage} />;

    if (tracks.length === 0 && lockedTrack.length === 0) {
      return null;
    }

    const playback = {
      playing,
      pausePlayback,
      resumePlayback
    };

    const playlistProp = {
      tracks: tracks,
      lockedTrack,
      trackError,
      updateTrackVotes: updateTrackNumOfVotes,
      removeTrack
    };

    // console.log('=====', tracks)
    // debugger

    return <PlaylistTemplate playlist={playlistProp} playback={playback} />;
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
    updateCurrentTrack
  }
)(Playlist);
